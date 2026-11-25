export default function (eleventyConfig) {
  // Copy the existing portfolio assets and link destinations into the preview.
  eleventyConfig.addPassthroughCopy({
    "../assets": "assets",
    "../styles.css": "styles.css",
    "../theme.js": "theme.js",
    "../portfolio.js": "portfolio.js",
    "../projects.html": "projects.html",
    "../experiments.html": "experiments.html",
    "../dog-photos.js": "dog-photos.js",
    "../form-no-js.html": "form-no-js.html",
    "../form-with-js.html": "form-with-js.html",
    "../form.js": "form.js",
  });

  return {
    templateFormats: ["njk"],
    dir: { input: "src", output: "_site" },
  };
}
