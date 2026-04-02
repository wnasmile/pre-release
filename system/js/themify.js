/* ============================================================
   themify.js — Theme, Cloak, GIF config
   Load ORDER: 2nd (depends on: utils.js)
   IIFEs here run immediately — theme/cloak apply before first paint.
   ============================================================ */

"use strict";

const DEFAULT_THEME    = "redux";
const DEFAULT_GIF_SIZE = 128;

/* ---------- Favicon / Cloak Helpers ---------- */

function setFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url && url.startsWith("http") ? url : (url ? `system/${url}` : "");
}

// Apply saved cloak immediately (before DOMContentLoaded).
(function applyGlobalCloak() {
  const savedTitle = localStorage.getItem("cloakTitle");
  const savedIcon  = localStorage.getItem("cloakIcon");
  if (savedTitle) document.title = savedTitle;
  if (savedIcon)  setFavicon(savedIcon);
})();

/* ---------- Theme ---------- */

// Apply saved theme immediately (before DOMContentLoaded).
(function applyGlobalTheme() {
  const saved = localStorage.getItem("selectedTheme")?.trim() || DEFAULT_THEME;
  document.documentElement.setAttribute("theme", saved);
  if (saved === "custom") {
    try {
      const vars = JSON.parse(localStorage.getItem("customTheme") || "{}");
      Object.entries(vars).forEach(([k, v]) =>
        document.documentElement.style.setProperty(k, v)
      );
    } catch (_) {}
  }
})();

// Sync theme + cloak changes across tabs.
window.addEventListener("storage", (e) => {
  if (e.key === "cloakTitle") document.title = e.newValue || document.title;
  if (e.key === "cloakIcon")  setFavicon(e.newValue || "");
  if (e.key === "selectedTheme") {
    const t = e.newValue?.trim() || DEFAULT_THEME;
    document.documentElement.setAttribute("theme", t);
    if (t !== "custom") document.documentElement.style.cssText = "";
  }
  if (e.key === "customTheme" && e.newValue) {
    try {
      const vars = JSON.parse(e.newValue);
      Object.entries(vars).forEach(([k, v]) =>
        document.documentElement.style.setProperty(k, v)
      );
    } catch (_) {}
  }
});

/* ---------- GIF Config ---------- */

// ROOT_GIFS is the single source of truth for fallback src + default sizes.
const ROOT_GIFS = {
  loading:   { src: "assets/themes/classic/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  loaded:    { src: "assets/themes/classic/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  searching: { src: "assets/themes/classic/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  crash:     { src: "assets/themes/classic/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  ded:       { src: "assets/themes/classic/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
};

// Per-theme overrides. All w/h are numbers.
const THEME_GIFS = {
  root: ROOT_GIFS,
  redux: {
    loading:   { src: "assets/themes/redux/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/redux/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/redux/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/redux/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/redux/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  classic: {
    loading:   { src: "assets/themes/classic/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/classic/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/classic/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/classic/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/classic/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  light: {
    loading:   { src: "assets/themes/light/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/light/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/light/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/light/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/light/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  dark: {
    loading:   { src: "assets/themes/dark/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/dark/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/dark/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/dark/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/dark/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  slackerish: {
    loading:   { src: "assets/themes/slackerish/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/slackerish/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/slackerish/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/slackerish/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/slackerish/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  graduation: {
    loading:   { src: "assets/themes/graduation/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/graduation/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/graduation/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/graduation/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/graduation/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  "flower-boy": {
    loading:   { src: "assets/themes/flower-boy/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/flower-boy/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/flower-boy/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/flower-boy/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/flower-boy/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  igor: {
    loading:   { src: "assets/themes/igor/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/igor/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/igor/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/igor/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/igor/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
  "i-am-music": {
    loading:   { src: "assets/themes/i-am-music/loading.gif",   w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    loaded:    { src: "assets/themes/i-am-music/loaded.gif",    w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    searching: { src: "assets/themes/i-am-music/searching.gif", w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    crash:     { src: "assets/themes/i-am-music/crash.gif",     w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
    ded:       { src: "assets/themes/i-am-music/ded.gif",       w: DEFAULT_GIF_SIZE, h: DEFAULT_GIF_SIZE },
  },
};

// Returns resolved { src, w, h } for a given theme + state key.
function getThemeGif(theme, key) {
  const entry     = (THEME_GIFS[theme] || {})[key] || {};
  const rootEntry = ROOT_GIFS[key] || {};
  return {
    src: entry.src || rootEntry.src || "",
    w:   entry.w   || rootEntry.w   || DEFAULT_GIF_SIZE,
    h:   entry.h   || rootEntry.h   || DEFAULT_GIF_SIZE,
  };
}

// Returns only the src string — used by main.js loader sequences.
function getThemeGifSrc(theme, key) {
  return getThemeGif(theme, key).src;
}

// Applies src + CSS vars to an img element.
function applyGifToImg(img, theme, key) {
  if (!img) return;
  const { src, w, h } = getThemeGif(theme, key);
  if (src) img.src = src;
  img.style.setProperty("--gif-w", `${w}px`);
  img.style.setProperty("--gif-h", `${h}px`);
  img.dataset.gifState = key;
}

// Updates live loader + searching gif when theme changes.
window.applyThemeGifs = function (theme) {
  const t = theme?.trim() || document.documentElement.getAttribute("theme") || DEFAULT_THEME;

  const loaderImg = document.querySelector("#containerLoader img");
  if (loaderImg) {
    const currentState = loaderImg.dataset.gifState || "loading";
    applyGifToImg(loaderImg, t, currentState);
  }

  const searchGif = document.getElementById("noResultsGif");
  if (searchGif) applyGifToImg(searchGif, t, "searching");
};

// Call this whenever you switch the loader to a new state.
window.setLoaderState = function (state) {
  const t   = document.documentElement.getAttribute("theme")?.trim() || DEFAULT_THEME;
  const img = document.querySelector("#containerLoader img");
  applyGifToImg(img, t, state);
};

/* ---------- Apply loading GIF before DOMContentLoaded ---------- */
(function () {
  const theme = localStorage.getItem("selectedTheme")?.trim() || DEFAULT_THEME;
  const img   = document.querySelector("#containerLoader img");
  if (img) applyGifToImg(img, theme, "loading");
})();
