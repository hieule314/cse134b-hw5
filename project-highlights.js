"use strict";

const sampleProjects = [
  {
    name: "WatchTower",
    summary: "A dashboard for browser errors, performance metrics, and user events.",
    details: "I led the frontend work and connected browser telemetry with Supabase and Clerk.",
  },
  {
    name: "Reg2Schedg",
    summary: "A course-planning tool that turns schedule screenshots into structured data.",
    details: "I built the research pipeline and normalized course evaluations in Supabase.",
  },
  {
    name: "Splitr",
    summary: "A mobile app that turns photos of receipts into items for shared expenses.",
    details: "I developed the React Native app and used Google Vision OCR to read the receipts.",
  },
];

class ProjectHighlights extends HTMLElement {
  static observedAttributes = ["compact"];

  currentIndex = 0;

  connectedCallback() {
    if (this.details) return;

    const heading = document.createElement("h3");
    heading.textContent = "Project Highlights";

    this.projectName = document.createElement("h4");
    this.summary = document.createElement("p");
    this.details = document.createElement("p");

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next project";
    nextButton.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % sampleProjects.length;
      this.renderProject();
    });

    this.status = document.createElement("p");
    this.status.setAttribute("role", "status");

    const controls = document.createElement("div");
    controls.className = "project-highlights-controls";
    controls.appendChild(nextButton);
    controls.appendChild(this.status);

    this.appendChild(heading);
    this.appendChild(this.projectName);
    this.appendChild(this.summary);
    this.appendChild(this.details);
    this.appendChild(controls);

    this.renderProject();
    this.updateDetailsVisibility();
  }

  attributeChangedCallback() {
    this.updateDetailsVisibility();
  }

  updateDetailsVisibility() {
    if (this.details) this.details.hidden = this.hasAttribute("compact");
  }

  renderProject() {
    const project = sampleProjects[this.currentIndex];
    this.projectName.textContent = project.name;
    this.summary.textContent = project.summary;
    this.details.textContent = project.details;
    this.status.textContent = `Project ${this.currentIndex + 1} of ${sampleProjects.length} · ${project.name}`;
  }
}

customElements.define("project-highlights", ProjectHighlights);

const projectHighlights = document.querySelector("#project-highlights");
const compactButton = document.querySelector("#project-highlights-compact");

compactButton.setAttribute("aria-pressed", String(projectHighlights.hasAttribute("compact")));
compactButton.addEventListener("click", () => {
  const isCompact = projectHighlights.toggleAttribute("compact");
  compactButton.setAttribute("aria-pressed", String(isCompact));
});
compactButton.hidden = false;
