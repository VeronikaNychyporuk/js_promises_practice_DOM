'use strict';

function createNotification(type, message) {
  const notification = document.createElement('div');

  notification.className = type;
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClicks() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClicked = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBothClicks();
  });
});

firstPromise
  .then((messageText) => createNotification('success', messageText))
  .catch((error) => createNotification('error', error.message));

secondPromise
  .then((messageText) => createNotification('success', messageText))
  .catch();

thirdPromise
  .then((messageText) => createNotification('success', messageText))
  .catch();
