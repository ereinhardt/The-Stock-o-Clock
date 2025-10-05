import { TIME_CODES } from "./timeCodes.js";

const local_code = window.navigator.language.split("_")[0];
var time = moment().locale(local_code).format("HH:mm");

function find_timeCode(timeCode){
    const codes = TIME_CODES;

    for (let Code = 0; Code < codes.length; Code++) {
        if(timeCode === codes[Code]) return true;
    
    }

    return false;
}

function OnTimeChanged(){

    const local_code = window.navigator.language.split("_")[0];
    const current_time = moment().locale(local_code).format("HH:mm");
    const hour = current_time.split(":")[0];
    const sec = current_time.split(":")[1];
    const timeCode = `${hour}_${sec}`;

    const isAvailableTimeCode = find_timeCode(timeCode);

    if(isAvailableTimeCode){
        const div = document.body;
        div.innerHTML = `<img src="./assets/${timeCode}.jpg" alt="" srcset="">`
    }

}

setInterval(() => {
  var t = moment().locale(local_code).format("HH:mm")

  if(t !== time){
    OnTimeChanged();
    time = t;
  }
}, 500);

OnTimeChanged();