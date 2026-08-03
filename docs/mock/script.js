const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

function closeMenu() {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  nav.dataset.open = "false";
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.dataset.open = String(!isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

const projectSearch = document.querySelector("[data-project-search]");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-card]")];
const resultCount = document.querySelector("[data-result-count]");
const emptyState = document.querySelector("[data-empty-state]");
let activeFilter = "all";

function normalize(value) {
  return value.trim().toLocaleLowerCase();
}

function updateProjectResults() {
  if (!projectCards.length) return;

  const query = normalize(projectSearch?.value ?? "");
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const title = normalize(card.dataset.title ?? "");
    const tags = normalize(card.dataset.tags ?? "");
    const copy = normalize(card.textContent ?? "");
    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
    const matchesQuery = !query || `${title} ${tags} ${copy}`.includes(query);
    const isVisible = matchesFilter && matchesQuery;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (resultCount) {
    resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
  }
  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

projectSearch?.addEventListener("input", updateProjectResults);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter ?? "all";
    filterButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    updateProjectResults();
  });
});
