(function ($) {
	"use strict";

	if (!window.history || !history.pushState) return;

	var origin = window.location.origin;

	function isSamePage(link) {
		return (
			link.origin === origin &&
			link.pathname === window.location.pathname &&
			link.search === window.location.search
		);
	}

	function shouldIntercept(link) {
		// Same origin only
		if (link.origin !== origin) return false;
		// Skip non-default targets (_blank etc.)
		if (link.target && link.target !== "" && link.target !== "_self") return false;
		// Skip hash/anchor-only links — let the browser handle scrolling
		var rawHref = link.getAttribute("href");
		if (!rawHref || rawHref.charAt(0) === "#") return false;
		// Skip direct media/document links
		if (/\.(jpe?g|png|gif|webp|svg|mp4|mov|avi|pdf|zip|docx?)(\?.*)?$/i.test(link.pathname)) return false;
		// Skip PhotoSwipe lightbox triggers
		if (link.hasAttribute("data-pswp-width")) return false;
		// Skip download links
		if (link.hasAttribute("download")) return false;
		return true;
	}

	function updateActiveNav(pathname) {
		$("#site-navigation .nav.navbar-nav li.menu-item, #offcanvas-left .menu li.menu-item").each(function () {
			var href = $(this).find("> a").attr("href");
			$(this).toggleClass("active", href === pathname);
		});
	}

	function navigateTo(url, push) {
		var $main = $("#main");
		if (!$main.length) return;

		fetch(url, { credentials: "same-origin" })
			.then(function (res) {
				return res.text();
			})
			.then(function (html) {
				var doc = new DOMParser().parseFromString(html, "text/html");
				var newMain = doc.getElementById("main");
				if (!newMain) {
					// Target page has no #main (e.g. error page) — fall back to full load
					window.location.href = url;
					return;
				}
				// Sync #page wrapper classes so per-page-type styling (.blog/.single/etc.)
				// survives partial swap — without this, .blog article spacing etc. is lost.
				var newPage = doc.getElementById("page");
				var $page = $("#page");
				if (newPage && $page.length) {
					$page.attr("class", newPage.className);
				}
				$main.html(newMain.innerHTML);
				document.title = doc.title;
				var pathname = new URL(url).pathname;
				if (push) history.pushState({ url: url }, doc.title, url);
				updateActiveNav(pathname);
				var scrollTarget = $page.length ? $page.offset().top : 0;
				$("html, body").animate({ scrollTop: scrollTarget }, 800);
				if (typeof window.reinitPhotoSwipe === "function") window.reinitPhotoSwipe();
			})
			.catch(function () {
				window.location.href = url;
			});
	}

	$(document).on("click", "a", function (e) {
		if (!shouldIntercept(this)) return;
		// Do nothing if already on this page
		if (isSamePage(this)) {
			e.preventDefault();
			return;
		}
		e.preventDefault();
		// Close offcanvas if it is open
		if ($("#offcanvas-left").hasClass("in")) {
			$("#offcanvas-left").offcanvas("hide");
		}
		navigateTo(this.href, true);
	});

	window.addEventListener("popstate", function (e) {
		navigateTo(e.state ? e.state.url : window.location.href, false);
	});

	// Store initial page state so popstate can reload it
	history.replaceState({ url: window.location.href }, document.title, window.location.href);
})(jQuery);
