const menuButton = document.querySelector("#menuButton");
const closePanelButton = document.querySelector("#closePanel");
const countryPanel = document.querySelector("#countryPanel");
const countrySearch = document.querySelector("#countrySearch");
const countryButtons = [...document.querySelectorAll(".country-option")];
const storyCards = [...document.querySelectorAll(".news-card")];
const newsHeading = document.querySelector("#newsHeading");
const emptyState = document.querySelector("#emptyState");

function setPanelOpen(isOpen) {
  countryPanel.hidden = !isOpen;
  menuButton.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    countrySearch.focus();
  }
}

function setActiveCountry(filter) {
  countryButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.countryFilter === filter);
  });
}

function updateHeading(filter, label) {
  newsHeading.textContent = filter === "all" ? "All News" : `${label} News`;
}

function filterStories(filter, label) {
  let visibleCount = 0;

  storyCards.forEach((card) => {
    const matches = filter === "all" || card.dataset.country === filter;
    card.classList.toggle("is-hidden", !matches);

    if (matches) {
      visibleCount += 1;
    }
  });

  setActiveCountry(filter);
  updateHeading(filter, label);
  emptyState.hidden = visibleCount !== 0;
  setPanelOpen(false);
}

function filterCountryButtons(searchText) {
  const query = searchText.trim().toLowerCase();

  countryButtons.forEach((button) => {
    if (button.dataset.countryFilter === "all") {
      button.classList.remove("is-hidden");
      return;
    }

    const matches = button.textContent.toLowerCase().includes(query);
    button.classList.toggle("is-hidden", !matches);
  });
}

menuButton.addEventListener("click", () => {
  setPanelOpen(countryPanel.hidden);
});

closePanelButton.addEventListener("click", () => {
  setPanelOpen(false);
});

document.addEventListener("click", (event) => {
  if (!countryPanel.hidden && !countryPanel.contains(event.target) && !menuButton.contains(event.target)) {
    setPanelOpen(false);
  }
});

countryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.countryFilter;
    const label = button.textContent.trim();
    filterStories(filter, label);
  });
});

countrySearch.addEventListener("input", () => {
  filterCountryButtons(countrySearch.value);
});

filterStories("all", "All");
