function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let startBtn = document.querySelector('button[data-start]');
let stopBtn = document.querySelector('button[data-stop]');
let body = document.querySelector('body');

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', onBtnStop);

let intervalId = null;

function changeColor() {
  //   const color = getRandomHexColor();
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function onBtnStop() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
