// import keys from './keys';
import keys from './keys';


const appState = {
  lang: 'en',
};

function drawBoard() {
  const div = document.createElement('div');
  div.className = 'wrapper';
  document.body.append(div);
  const text = document.createElement('textarea');
  text.className = 'textarea';
  text.setAttribute('disabled', 'disabled');
  document.body.querySelector('div').append(text);
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  document.body.querySelector('div').append(keyboard);
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in keys) {
    const btn = document.createElement('div');
    btn.className = 'btn';
    btn.innerText = appState.lang === 'en' ? keys[key].en : keys[key].ru;
    btn.setAttribute('keyCode', keys[key].code);
    keyboard.appendChild(btn);
  }
}
drawBoard();


document.addEventListener('keydown', (event) => {
  const button = keys.find((btn) => btn.code === event.code);
  document.querySelector(`div[keycode=${button.code}]`).style.background = 'linear-gradient(rgb(250, 250, 250), rgb(150, 160, 170))';
  if (button[appState.lang].length === 1) {
    document.body.querySelector('textarea').insertAdjacentText('beforeend', `${button[appState.lang]}`);
  }
});

document.addEventListener('keyup', (event) => {
  const button = keys.find((btn) => btn.code === event.code);
  document.querySelector(`div[keycode=${button.code}]`).style.background = 'rgb(243, 243, 243)';
});

document.querySelector('.keyboard').addEventListener('click', (event) => {
  if (event.target.className !== 'keyboard' && event.target.innerText.length === 1) {
    document.body.querySelector('textarea').insertAdjacentText('beforeend', `${event.target.innerText}`);
  }
});

document.addEventListener('keydown', (event) => {
  const button = keys.find((btn) => btn.code === event.code);
  if (button.code === 'CapsLock' && document.body.querySelector('.keyboard').style.textTransform !== 'capitalize') {
    document.body.querySelector('.keyboard').style.textTransform = 'capitalize';
  } else document.body.querySelector('.keyboard').style.textTransform = 'none';
});
