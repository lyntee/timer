const countdownDisplay = document.querySelector("#timer");
const sixty = document.getElementById("60");
const thirty = document.getElementById("30");
const container = document.querySelector(".message-container");
let count = 60;
let timerId;

sixty.addEventListener("click", startCountdown);
thirty.addEventListener("click", startCountdown);

function startCountdown(event) {
  if (container.hasChildNodes) {
    for (let i = 0; i < container.children.length; i++) {
      container.removeChild(container.children[i]);
    }
  }
  count = Number(event.target.id);
  countdownDisplay.textContent = count;
  timerId = setInterval(countdown, 1000);
}

function countdown() {
  count--;
  countdownDisplay.textContent = count;
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
