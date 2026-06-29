const delayMs = 6000;

function flashTimeout() {
  console.log("timer beginn");
  setTimeout(removeFlash, delayMs);
}

function removeFlash() {
  const flashbox = document.querySelector(".flashbox");
  flashbox.remove();
  console.log("removed");
}

// JS availablity check
if ("querySelector" in document && "addEventListener" in window) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", flashTimeout);
  } else {
    flashTimeout();
  }
}
