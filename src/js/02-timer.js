import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';
// import moment from 'moment';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('button[data-start]'),
  inputData: document.querySelector('#datetime-picker'),
  day: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedDate = null;
let intervalId = null;
const nowDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < nowDate) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
        timeout: 1500,
      });
      return;
    } else {
      refs.start.removeAttribute('disabled');
      return (selectedDate = selectedDates[0]);
    }
  },
};

refs.start.setAttribute('disabled', 'disabled');

flatpickr(refs.inputData, options);

refs.start.addEventListener('click', onTimer);

function onTimer() {
  intervalId = setInterval(() => {
    ms = selectedDate - Date.now();
    const timeComponent = convertMs(ms);
    updateClockFace(timeComponent);
    refs.start.setAttribute('disabled', 'disabled');
  }, 1000);
}

function updateClockFace(comp) {
  refs.day.textContent = `${comp.days}`;
  refs.hours.textContent = `${comp.hours}`;
  refs.minutes.textContent = `${comp.minutes}`;
  refs.seconds.textContent = `${comp.seconds}`;
  if (
    Number(comp.days) === 0 &&
    Number(comp.hours) === 0 &&
    Number(comp.minutes) === 0 &&
    Number(comp.seconds) === 0
  ) {
    clearInterval(intervalId);
    refs.start.setAttribute('disabled', 'disabled');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
