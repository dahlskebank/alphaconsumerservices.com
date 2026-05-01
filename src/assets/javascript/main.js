jQuery(document).ready(function ($) {

  // Tables — add Bootstrap class
  $('table').addClass('table');

  // Selects — add Bootstrap class
  $('select').addClass('form-control');

  // --- High contrast (localStorage instead of cookie) ---
  var savedContrast = localStorage.getItem('contrast');
  if (savedContrast) {
    $('html').attr('class', savedContrast);
  }

  $('.dd-contrast-toggle').on('click', function (event) {
    event.preventDefault();
    $('html').toggleClass('high-contrast');
    localStorage.setItem('contrast', $('html').attr('class'));
  });

  // --- Cookie notice (localStorage instead of cookie) ---
  if (localStorage.getItem('cookienotice')) {
    $('#cookie-notice').addClass('hidden');
  } else {
    $('#cookie-notice').removeClass('hidden');
  }

  $('.cookie-notice-hide').on('click', function (event) {
    event.preventDefault();
    localStorage.setItem('cookienotice', '1');
    $('#cookie-notice').alert('close');
  });

  // --- Back to top button ---
  var scrollHeight75 = Math.floor($(window).height() * 0.75);

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > scrollHeight75) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $('#toTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });

});

(function ($) {

  // Pop-up window for #change-later links
  $('#change-later').on('click', 'a', function (event) {
    event.preventDefault();
    windowpop(this.href, 545, 433);
  });

  function windowpop(url, width, height) {
    var leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    var topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    window.open(url, '_blank',
      'status=no,height=' + height + ',width=' + width +
      ',resizable=yes,left=' + leftPosition + ',top=' + topPosition +
      ',screenX=' + leftPosition + ',screenY=' + topPosition +
      ',toolbar=no,menubar=no,scrollbars=no,location=no,directories=no,copyhistory=yes');
  }

  // Off-canvas navigation
  if (typeof $.fn.offcanvas === 'function') {
    $('.offcanvas-open-left').on('click', 'a', function (event) {
      event.preventDefault();
      $('#offcanvas-left').offcanvas('toggle');
    });

    $('#offcanvas-left').offcanvas({
      toggle: false,
      placement: 'left',
      autohide: true,
      recalc: false,
      disableScrolling: false
    });
  }

})(jQuery);
