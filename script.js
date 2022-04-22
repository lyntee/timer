const countdownDisplay = document.querySelector("#timer");
const container = document.querySelector(".message-container");
const countdownDateInput = document.querySelector("#countdown-date");
const allButtons = document.querySelectorAll(".options button");
let count = 60;
let timerId;

allButtons.forEach((button) => {
  button.addEventListener("click", startCountdown);
});

function startCountdown(event) {
  if (container.hasChildNodes()) {
    for (let i = 0; i < container.children.length; i++) {
      container.removeChild(container.children[i]);
    }
  }

  if (event.target.id === "60" || event.target.id === "30") {
    count = Number(event.target.id);
    countdownDisplay.textContent = `${count} seconds`;
    timerId = setInterval(countdownSecondsLeft, 1000);
  } else {
    countdownTime();
    timerId = setInterval(countdownTime, 1000);
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const currentDateMS = Date.parse(currentDate);
  return currentDateMS;
}

function getChosenDateInput() {
  const chosenDate = countdownDateInput.value;
  const chosenDateMS = Date.parse(chosenDate);
  return chosenDateMS;
}

function countdownTime() {
  const dateNow = getCurrentDate();
  const selectedDate = getChosenDateInput();
  if (selectedDate !== "" && selectedDate > dateNow) {
    let timeLeftMS = selectedDate - dateNow;
    const yearLeft = Math.floor(timeLeftMS / (365.25 * 24 * 60 * 60 * 1000));
    timeLeftMS -= yearLeft * (365.25 * 24 * 60 * 60 * 1000);
    const monthLeft = Math.floor(timeLeftMS / (30 * 24 * 60 * 60 * 1000));
    timeLeftMS -= monthLeft * (30 * 24 * 60 * 60 * 1000);
    const daysLeft = Math.floor(timeLeftMS / (24 * 60 * 60 * 1000));
    timeLeftMS -= daysLeft * (24 * 60 * 60 * 1000);
    const hoursLeft = Math.floor(timeLeftMS / (60 * 60 * 1000));
    timeLeftMS -= hoursLeft * (60 * 60 * 1000);
    const minLeft = Math.floor(timeLeftMS / (60 * 1000));
    timeLeftMS -= minLeft * (60 * 1000);
    const secLeft = Math.floor(timeLeftMS / 1000);
    // timeLeftMS -= secLeft * 1000;
    countdownDisplay.textContent = `${yearLeft} Year(s) ${monthLeft} Month(s) ${daysLeft} Day(s) ${hoursLeft} Hour(s) ${minLeft} Minute(s) ${secLeft} Second(s) left`;
    if (yearLeft === 0 && monthLeft === 0 && daysLeft === 0 && hoursLeft === 0 && minLeft === 0 && secLeft === 0) {
      clearInterval(timerId);
      showEndMessage();
    }
  }
}

function countdownSecondsLeft() {
  count--;
  countdownDisplay.textContent = `${count} seconds`;
  if (count === 0) {
    clearInterval(timerId);
    showEndMessage();
  }
}

function showEndMessage() {
  const message = document.createElement("p");
  message.textContent = "Time's up!"
  message.classList.add("time-up");
  container.appendChild(message);
}
