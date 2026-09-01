function getCurrentTime() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

let time = getCurrentTime();
let currentImg = null;
let preloadedImagePromise = null;
let preloadedTimeCode = null;
let requestedTimeCode = null;

function getImageUrl(timeCode) {
  return `./backend/image.php?time=${encodeURIComponent(timeCode)}`;
}

function loadImage(timeCode) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = getImageUrl(timeCode);
  });
}

function getNextTimeCode(currentTimeCode) {
  const [hour, minute] = currentTimeCode.split("_").map(Number);
  const nextMinute = (hour * 60 + minute + 1) % (24 * 60);
  return `${String(Math.floor(nextMinute / 60)).padStart(2, "0")}_${String(nextMinute % 60).padStart(2, "0")}`;
}

function preloadNextImage(currentTimeCode) {
  const nextTimeCode = getNextTimeCode(currentTimeCode);
  preloadedImagePromise = loadImage(nextTimeCode);
  preloadedTimeCode = nextTimeCode;
}

function displayImage(image) {
  if (currentImg) {
    currentImg.remove();
  }
  image.alt = "";
  document.body.appendChild(image);
  currentImg = image;
}

async function OnTimeChanged() {
  const currentTime = getCurrentTime();
  const [hour, minute] = currentTime.split(":");
  const timeCode = `${hour}_${minute}`;
  requestedTimeCode = timeCode;

  let imagePromise;
  if (preloadedImagePromise && preloadedTimeCode === timeCode) {
    imagePromise = preloadedImagePromise;
    preloadedImagePromise = null;
    preloadedTimeCode = null;
  } else {
    imagePromise = loadImage(timeCode);
  }

  preloadNextImage(timeCode);

  const image = await imagePromise;
  if (image && requestedTimeCode === timeCode) displayImage(image);
}

setInterval(() => {
  const currentTime = getCurrentTime();

  if (currentTime !== time) {
    OnTimeChanged();
    time = currentTime;
  }
}, 500);

OnTimeChanged();
