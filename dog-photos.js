"use strict";

const dogPhotoEndpoint = "https://dog.ceo/api/breeds/image/random";

class DogPhotoViewer extends HTMLElement {
  static observedAttributes = ["compact"];

  connectedCallback() {
    if (this.caption) return;

    const heading = document.createElement("h3");
    heading.textContent = "Random dog photo";

    this.requestButton = document.createElement("button");
    this.requestButton.type = "button";
    this.requestButton.textContent = "Surprise me with a dog";
    this.requestButton.addEventListener("click", () => this.loadPhoto());

    this.status = document.createElement("p");
    this.status.setAttribute("role", "status");

    const controls = document.createElement("div");
    controls.className = "dog-photo-controls";
    controls.appendChild(this.requestButton);
    controls.appendChild(this.status);

    this.figure = document.createElement("figure");
    this.figure.hidden = true;
    this.photo = document.createElement("img");
    this.caption = document.createElement("figcaption");
    this.figure.appendChild(this.photo);
    this.figure.appendChild(this.caption);

    this.appendChild(heading);
    this.appendChild(controls);
    this.appendChild(this.figure);
    this.updateCaptionVisibility();
  }

  attributeChangedCallback() {
    this.updateCaptionVisibility();
  }

  updateCaptionVisibility() {
    if (this.caption) this.caption.hidden = this.hasAttribute("compact");
  }

  async loadPhoto() {
    if (this.requestButton.getAttribute("aria-disabled") === "true") return;

    this.requestButton.setAttribute("aria-disabled", "true");
    this.status.textContent = "Loading a dog photo…";

    try {
      const response = await fetch(dogPhotoEndpoint);
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);

      const data = await response.json();
      if (data?.status !== "success" || typeof data.message !== "string") {
        throw new Error("Expected a dog photo URL in the response.");
      }

      const imageUrl = new URL(data.message);
      if (imageUrl.protocol !== "https:") throw new Error("Expected an HTTPS image URL.");

      const category = imageUrl.pathname.match(/^\/breeds\/([a-z]+(?:-[a-z]+)*)\//)?.[1];
      const photo = document.createElement("img");
      photo.alt = category
        ? `Dog from the ${category.replaceAll("-", " ")} collection`
        : "A dog from the Dog CEO collection";
      photo.src = imageUrl.href;
      await photo.decode();

      this.photo.replaceWith(photo);
      this.photo = photo;
      this.caption.textContent = category ? `Dog CEO collection · ${category}` : "Photo from Dog CEO";
      this.figure.hidden = false;
      this.status.textContent = "Dog photo loaded.";
    } catch {
      this.status.textContent = "Couldn’t load a dog photo. Try again.";
    } finally {
      this.requestButton.removeAttribute("aria-disabled");
    }
  }
}

customElements.define("dog-photo-viewer", DogPhotoViewer);

const dogPhotoViewer = document.querySelector("#dog-photos");
const compactButton = document.querySelector("#dog-photos-compact");

compactButton.setAttribute("aria-pressed", String(dogPhotoViewer.hasAttribute("compact")));
compactButton.addEventListener("click", () => {
  const isCompact = dogPhotoViewer.toggleAttribute("compact");
  compactButton.setAttribute("aria-pressed", String(isCompact));
});
compactButton.hidden = false;
