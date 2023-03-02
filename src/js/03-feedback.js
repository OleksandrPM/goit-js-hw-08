import throttle from 'lodash.throttle';

const LOCALSTORAGE_FEEDBACK_KEY = 'feedback-form-state';
const throttleTime = 500;

const feedbackFormEl = document.querySelector('.feedback-form');

if (localStorage.getItem(LOCALSTORAGE_FEEDBACK_KEY)) {
  feedbackFormEl.email.value = getStorageData(LOCALSTORAGE_FEEDBACK_KEY).email;
  feedbackFormEl.message.value = getStorageData(
    LOCALSTORAGE_FEEDBACK_KEY
  ).message;
} else {
  feedbackFormEl.email.value = '';
  feedbackFormEl.message.value = '';
}

feedbackFormEl.addEventListener(
  'input',
  throttle(onFeedbackFormElInput, throttleTime, { trailing: false })
);

feedbackFormEl.addEventListener('submit', onFeedbackFormElSubmit);

function onFeedbackFormElInput(event) {
  localStorage.setItem(
    LOCALSTORAGE_FEEDBACK_KEY,
    JSON.stringify(
      createDataObject(
        event.currentTarget.email.value,
        event.currentTarget.message.value
      )
    )
  );
}

function onFeedbackFormElSubmit(event) {
  event.preventDefault();

  const email = feedbackFormEl.email.value;
  const message = feedbackFormEl.message.value;
  console.log(createDataObject(email, message));

  localStorage.removeItem(LOCALSTORAGE_FEEDBACK_KEY);
  feedbackFormEl.email.value = '';
  feedbackFormEl.message.value = '';
}

function getStorageData(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch (error) {
    console.log(`There is no data with key ${storageKey} in the Local Storage`);
  }
}

function createDataObject(email, message) {
  return { email: email, message: message };
}
