import { TIME_CODES } from "./timeCodes.js";

const local_code = window.navigator.language.split("_")[0];
var time = moment().locale(local_code).format("HH:mm");
let currentImg = null;
let preloadedImg = null;
let preloadedTimeCode = null;

function find_timeCode(timeCode) {
  const codes = TIME_CODES;

  for (let Code = 0; Code < codes.length; Code++) {
    if (timeCode === codes[Code]) return true;
  }

  return false;
}

function getNextTimeCode(currentTimeCode) {
  const index = TIME_CODES.indexOf(currentTimeCode);
  if (index !== -1 && index < TIME_CODES.length - 1) {
    return TIME_CODES[index + 1];
  }
  return TIME_CODES[0]; // Zurück zum Anfang
}

function preloadNextImage(currentTimeCode) {
  const nextTimeCode = getNextTimeCode(currentTimeCode);

  if (nextTimeCode && find_timeCode(nextTimeCode)) {
    preloadedImg = new Image();
    preloadedImg.src = `./assets/${nextTimeCode}.jpg`;
    preloadedTimeCode = nextTimeCode;
  }
}

function OnTimeChanged() {
  const local_code = window.navigator.language.split("_")[0];
  const current_time = moment().locale(local_code).format("HH:mm");
  const hour = current_time.split(":")[0];
  const sec = current_time.split(":")[1];
  const timeCode = `${hour}_${sec}`;

  const isAvailableTimeCode = find_timeCode(timeCode);

  if (isAvailableTimeCode) {
    // Prüfen ob das Bild bereits vorgeladen wurde
    if (
      preloadedImg &&
      preloadedTimeCode === timeCode &&
      preloadedImg.complete
    ) {
      // Vorgeladenes Bild verwenden
      if (currentImg) {
        currentImg.remove();
      }
      preloadedImg.alt = "";
      document.body.appendChild(preloadedImg);
      currentImg = preloadedImg;
      preloadedImg = null;
      preloadedTimeCode = null;
    } else {
      // Bild laden und erst anzeigen wenn fertig
      const newImg = new Image();
      newImg.onload = function () {
        if (currentImg) {
          currentImg.remove();
        }
        newImg.alt = "";
        document.body.appendChild(newImg);
        currentImg = newImg;
      };
      newImg.src = `./assets/${timeCode}.jpg`;
    }

    // Nächstes Bild im Hintergrund vorladen
    preloadNextImage(timeCode);
  }
}

setInterval(() => {
  var t = moment().locale(local_code).format("HH:mm");

  if (t !== time) {
    OnTimeChanged();
    time = t;
  }
}, 500);

OnTimeChanged();
