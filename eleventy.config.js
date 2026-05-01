/*
 * ============================================================
 *  ELEVENTY CONFIGURATION  —  eleventy.config.js
 * ============================================================
 *
 *  Eleventy reads source files from `src/` and outputs static
 *  HTML to `_site/`.  Templates use Nunjucks (.njk).
 *
 *  COMMANDS:
 *    npm start       →  Build + live-reload dev server
 *    npm run build   →  Production build into _site/
 * ============================================================
 */

module.exports = function (eleventyConfig) {
	/* ----------------------------------------------------------
	 *  PASSTHROUGH COPIES
	 *  Static files copied as-is from src/ into _site/.
	 * ---------------------------------------------------------- */
	eleventyConfig.addPassthroughCopy("src/assets");

	/* ----------------------------------------------------------
	 *  WATCH TARGETS
	 *  Eleventy watches .njk/.md by default; also watch assets so
	 *  the dev server reloads when CSS/JS/images change.
	 * ---------------------------------------------------------- */
	eleventyConfig.addWatchTarget("src/assets/");

	/* ----------------------------------------------------------
	 *  CACHE-BUSTING
	 *  Build timestamp exposed as {{ cacheBust }}.  Append to
	 *  local CSS/JS URLs as ?v={{ cacheBust }} to force browsers
	 *  to refetch after each build.
	 * ---------------------------------------------------------- */
	eleventyConfig.addGlobalData("cacheBust", Date.now());

	/* ----------------------------------------------------------
	 *  COLLECTIONS
	 * ---------------------------------------------------------- */
	// All posts, newest first.  Used on the press room and archives.
	eleventyConfig.addCollection("posts", (col) =>
		col.getFilteredByGlob("src/posts/*.njk").sort((a, b) => b.date - a.date)
	);

	/* ----------------------------------------------------------
	 *  CUSTOM FILTERS
	 *  Usage in Nunjucks:  {{ value | filterName }}
	 * ---------------------------------------------------------- */

	// {{ array | limit(5) }}  →  first 5 items
	// (Nunjucks' built-in slice() works differently — this gives
	// you Array.prototype.slice semantics.)
	eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

	// {{ post.date | dateDisplay }}  →  "September 11, 2012"
	eleventyConfig.addFilter("dateDisplay", (dateObj) => {
		return new Date(dateObj).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		});
	});

	// {{ post.tags | withoutTag("posts") }}  →  removes the internal
	// "posts" tag used to assemble the collection.
	eleventyConfig.addFilter("withoutTag", (tags, exclude) =>
		(tags || []).filter((t) => t !== exclude)
	);

	// {{ post.date | htmlDateString }}  →  "2012-09-11"  (for <time datetime>)
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return new Date(dateObj).toISOString().split("T")[0];
	});

	/* ----------------------------------------------------------
	 *  DIRECTORY STRUCTURE
	 *  input:    "src"          →  source files
	 *  output:   "_site"        →  built site (deploy this)
	 *  includes: "_includes"    →  layouts & partials  (relative to input)
	 *  data:     "_data"        →  global data files   (relative to input)
	 * ---------------------------------------------------------- */
	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data",
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
};
