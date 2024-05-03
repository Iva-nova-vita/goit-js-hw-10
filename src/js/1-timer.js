import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let initialDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: initialDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    initialDate = new Date();
    const isDateValid = userSelectedDate - initialDate > 0;
    isDateValid
      ? refs.btnStart.disabled = false
      : showNotification();
  },
};

flatpickr('#datetime-picker', options);

function showNotification() {
  refs.btnStart.disabled = true;
  iziToast.error({
    message: 'Please choose a date in the future',
    position: 'topRight',
    class: 'error',
    color: 'white',
    timeout: 3000,
  });
}

refs.btnStart.addEventListener('click', countDown);

function countDown() {
  refs.btnStart.disabled = true;
  refs.datetimePicker.disabled = true;
  let time = userSelectedDate - initialDate;

  for (let index = 0; index < time; index += 1000) {
    setTimeout(() => {
      const date = convertMs(time);
      const { days, hours, minutes, seconds } = date;
      refs.days.innerHTML = addLeadingZero(days);
      refs.hours.innerHTML = addLeadingZero(hours);
      refs.minutes.innerHTML = addLeadingZero(minutes);
      refs.seconds.innerHTML = addLeadingZero(seconds);
      time -= 1000;
      time <= 0 && (refs.datetimePicker.disabled = false);
    }, index);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
