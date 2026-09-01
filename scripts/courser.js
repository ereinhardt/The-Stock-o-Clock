const HIDE_DELAY = 5000;

// cursor is not inherited reliably by every element, so the rule targets all of them
const style = document.createElement("style");
style.textContent = ".cursor-hidden, .cursor-hidden * { cursor: none !important; }";
document.head.appendChild(style);

let hideTimeout = setTimeout(hideCursor, HIDE_DELAY);

function hideCursor() {
  document.documentElement.classList.add("cursor-hidden");
}

function showCursor() {
  document.documentElement.classList.remove("cursor-hidden");
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(hideCursor, HIDE_DELAY);
}

document.addEventListener("mousemove", showCursor);
