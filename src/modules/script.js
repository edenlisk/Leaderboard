// Super Death Row unique ID: "p4T1fCGuGRNNPTH4EMZI"
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/p4T1fCGuGRNNPTH4EMZI/scores';
const userName = document.querySelector('.name');
const score = document.querySelector('.score');
const message = document.querySelector('.message-container');

const renderRecord = (record) => {
  const recordContainer = document.createElement('div');
  recordContainer.classList.add('person-info', 'border-bottom', 'border-dark', 'px-2');
  const person = document.createElement('p');
  person.classList.add('person');
  person.innerText = `${record.user}: ${record.score}`;
  recordContainer.appendChild(person);
  document.querySelector('.leaderboard').appendChild(recordContainer);
};

export const retrieveScores = async () => {
  document.querySelector('.leaderboard').innerHTML = '';
  const request = await fetch(url);
  const info = await request.json();
  info.result.forEach((record) => {
    renderRecord(record);
  });
};

const deleteMessage = () => {
  message.classList.add('d-none');
  message.classList.remove('active');
};

const successMessage = () => {
  message.classList.remove('d-none');
  message.classList.toggle('active');
  message.innerHTML = 'successful';
  setTimeout(deleteMessage, 2000);
};

const saveScore = async () => {
  const record = {
    user: userName.value,
    score: score.value,
  };
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(record),
  });
  const info = await request.json();
  await successMessage(info.result);
};

export const runApp = () => {
  document.querySelector('.refresh-btn').addEventListener('click', () => {
    retrieveScores();
  });
  document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (userName.value && score.value) {
      saveScore();
    }
    userName.value = '';
    score.value = '';
  });
};
