class activeNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    styleActiveItem(this);
  }
}

function styleActiveItem(nav) {
  const navItems = nav.querySelectorAll("a");
  const url = window.location.href;

  for (var i = 0; i < navItems.length; i++) {
    const itemText = navItems.item(i).textContent.toLowerCase();

    if (url.includes(itemText)) {
      navItems.item(i).classList.add("nav-active");
    }
  }
}

// JS availablity check
if (
  "customElements" in window &&
  "querySelector" in document &&
  "addEventListener" in window
) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      customElements.define("active-nav", activeNav),
    );
  } else {
    customElements.define("active-nav", activeNav);
  }
}
