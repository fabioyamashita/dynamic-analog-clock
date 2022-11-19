const pointerHour = document.querySelector(".pointer.hour");
const pointerMinute = document.querySelector(".pointer.minute");
const pointerSecond = document.querySelector(".pointer.second");

const btnStartStopClock = document.querySelectorAll(".btn-submit");
const btnStartClock = document.querySelector(".custom-clock--off");
const btnStopClock = document.querySelector(".custom-clock--on");
const inputHour = document.querySelector(".input-hour");
const clockInfo = document.querySelector(".clock-info");

const customClockSpeedContainer = document.querySelector(".custom-clock-speed");
const btnSpeed = document.querySelectorAll(".btn-speed");

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let day = currentDate.getDay();

let defaultSpeed = 1000;
let clockSpeed = defaultSpeed;

// CLOCK UPDATE
function updateClock() {
  const date = currentDate;

  const secondsMovement = date.getSeconds() / 60;
  const minutesMovement = (secondsMovement + date.getMinutes()) / 60;
  const hoursMovement = (minutesMovement + date.getHours()) / 12;

  showRotation(pointerSecond, secondsMovement);
  showRotation(pointerMinute, minutesMovement);
  showRotation(pointerHour, hoursMovement);

  date.setSeconds(date.getSeconds() + 1);
}

function showRotation(element, timeMovement) {
  element.style.transform = `translateY(-50%) rotate(${timeMovement * 360}deg)`;
}

// CUSTOM CLOCK SETUP
btnStartStopClock.forEach((el) => {
  el.addEventListener("click", () => {
    if (el == btnStartClock) {
      if (inputHour.value == "") {
        alert("Enter a start time!");
        return;
      }

      const [hour, minute] = inputHour.value.split(":");
      currentDate = new Date(year, month, day, hour, minute, 0, 0);
      inputHour.setAttribute("disabled", "");
      clockInfo.innerText = "Showing Custom Clock";
    } else if (el == btnStopClock) {
      currentDate = new Date();
      inputHour.removeAttribute("disabled");
      inputHour.value = "";
      clockInfo.innerText = "Showing Current Time";

      clearInterval(interval);
      interval = setInterval(updateClock, defaultSpeed);
    }

    btnStartClock.classList.toggle("hidden");
    btnStopClock.classList.toggle("hidden");
    customClockSpeedContainer.classList.toggle("hidden");
  });
});

// CUSTOM SPEED SETUP
btnSpeed.forEach((el) => {
  el.addEventListener("click", changeClockSpeed);
});

function changeClockSpeed() {
  //   console.log(el.dataset.clockSpeed);
  btnSpeed.forEach((el) => {
    el.classList.remove("active");
  });
  this.classList.toggle("active");

  if (this.dataset.clockSpeed == 1) clockSpeed = defaultSpeed;
  else clockSpeed = defaultSpeed / this.dataset.clockSpeed;

  clearInterval(interval);
  interval = setInterval(updateClock, clockSpeed);
}

let interval = setInterval(updateClock, defaultSpeed);
updateClock();
