# CSE 134B Homework 5

The portfolio starts at [`index.html`](index.html). The random dog photo viewer is on the [Experiments page](experiments.html#dog-photos) and is linked from Selected work on the home page.

The [submission links](links.txt) point to this repository, the deployed home page, and the deployed Experiments page.

## Dog photo viewer design

A visitor can discover a random dog photo by selecting **Surprise me with a dog**. The viewer sends a GET request to the Dog CEO API and shows “Loading a dog photo…” in its status area. It checks the JSON response for a valid HTTPS image URL, waits for the image to decode, then replaces the displayed image and updates its caption and status. If anything fails, the status asks the visitor to try again and the last successfully loaded photo stays visible. **Compact view** hides the caption and saves that choice for later visits.

## Static site generator exercise

The separate Eleventy project is in [`ssg-exercise/`](ssg-exercise/). It generates Home (`/`) and About (`/about.html`) with one shared footer. See the [exercise README](ssg-exercise/README.md) for installation, build, and preview commands.
