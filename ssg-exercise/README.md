# Eleventy exercise

From the Homework 5 repository root, run the following commands with Node.js 18 or later.

```sh
cd ssg-exercise
npm ci
npm run build
npm run preview
```

Preview [Home](http://localhost:8080/) and [About](http://localhost:8080/about.html). Eleventy writes both generated pages to `_site/` and copies the portfolio’s existing styles, scripts, assets, and linked pages there for the preview.

Both templates include [`src/_includes/footer.njk`](src/_includes/footer.njk). Edit that file, run `npm run build` again, and refresh both pages to see the same change. The preview server also rebuilds when the include changes.
