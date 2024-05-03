import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const delay = form.elements.delay.value;
  const state = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state == 'fulfilled') {
        resolve(`OK Fulfilled promise in ${delay}ms`);
      } else {
        reject(`ERROR Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(message => {
      showNotification(message, 'success');
    })
    .catch(message => {
      showNotification(message, 'error');
    });

  form.reset();
}

function showNotification(message, state) {
  const options = {
    message,
    position: 'topRight',
    class: state,
    color: 'white',
    timeout: 3000,
  };
  iziToast[state](options);
}
