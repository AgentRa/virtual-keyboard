// import keys from './keys';
import keys from './keys';


const appState = {
  lang: 'ru',
  shiftFlag: 'off',
};

if (localStorage.getItem('lang') !== null) {
  appState.lang = localStorage.getItem('lang');
}

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
function drawBoard() {
  if (appState.shiftFlag === 'off') {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in keys) {
      const btn = document.createElement('div');
      btn.className = 'btn';
      btn.innerText = appState.lang === 'en' ? keys[key].en : keys[key].ru;
      btn.setAttribute('keyCode', keys[key].code);
      keyboard.appendChild(btn);
    }
  } else {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in keys) {
      const btn = document.createElement('div');
      btn.className = 'btn';
      if (appState.lang === 'ru') {
        btn.innerText = (keys[key].ruSpec) ? keys[key].ruSpec : keys[key].ru;
        btn.setAttribute('keyCode', keys[key].code);
        keyboard.appendChild(btn);
      } else {
        btn.innerText = (keys[key].enSpec) ? keys[key].enSpec : keys[key].en;
        btn.setAttribute('keyCode', keys[key].code);
        keyboard.appendChild(btn);
      }
    }
  }
}
drawBoard();

function shift() {
  if (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 97
    || document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 65) {
    keyboard.style.textTransform = (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() !== 97)
      ? 'none'
      : 'capitalize';
  }
  if (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 1060
    || document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 1092) {
    keyboard.style.textTransform = (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() !== 1092)
      ? 'none'
      : 'capitalize';
  }
  if (appState.shiftFlag === 'on') {
    keyboard.innerHTML = '';
    drawBoard();
  }
  keyboard.innerHTML = '';
  drawBoard();
}


document.addEventListener('keydown', (event) => {
  const button = keys.find((btn) => btn.code === event.code);
  const key = document.querySelector(`div[keycode=${button.code}]`);
  const string = document.querySelector('textarea');
  key.style.background = 'linear-gradient(rgb(250, 250, 250), rgb(150, 160, 170))';
  if (button[appState.lang].length === 1) {
    text.value += `${key.innerText}`;
  }
  switch (button.code) {
    case 'CapsLock':
      keyboard.style.textTransform = keyboard.style.textTransform !== 'capitalize'
        ? 'capitalize'
        : 'none';
      break;
    case 'ShiftRight':
    case 'ShiftLeft':
      if (appState.shiftFlag === 'off') {
        appState.shiftFlag = 'on';
        shift();
      }
      break;
    case 'Tab':
      event.preventDefault();
      text.value += '  ';
      break;
    case 'Space':
      text.value += ' ';
      break;
    case 'Backspace':
      string.value = string.value.substr(0, string.value.length - 1);
      break;
    case 'Enter':
      text.value += '\n';
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', (event) => {
  const button = keys.find((btn) => btn.code === event.code);
  const key = document.querySelector(`div[keycode=${button.code}]`);
  key.style.background = 'rgb(243, 243, 243)';
  if (button.en === 'Shift') {
    appState.shiftFlag = 'off';
    shift();
  }
});

document.querySelector('.keyboard').addEventListener('click', (event) => {
  if (event.target.className !== 'keyboard' && event.target.innerText.length === 1) {
    text.value += `${event.target.innerText}`;
  }
  const button = keys.find((btn) => btn.en === event.target.innerText);
  const string = document.querySelector('textarea');
  switch (button.code) {
    case 'CapsLock':
      keyboard.style.textTransform = keyboard.style.textTransform !== 'capitalize'
        ? 'capitalize'
        : 'none';
      break;
    case 'Tab':
      event.preventDefault();
      text.value += '  ';
      break;
    case 'Backspace':
      string.value = string.value.substr(0, string.value.length - 1);
      break;
    case 'Space':
      text.value += ' ';
      break;
    case 'Enter':
      text.value += '\n';
      break;
    default:
      break;
  }
});

document.querySelector('.keyboard').addEventListener('mousedown', (event) => {
  const button = keys.find((btn) => btn.en === event.target.innerText);
  if (button.en === 'Shift') {
    if (appState.shiftFlag === 'off') {
      appState.shiftFlag = 'on';
      shift();
    }
  }
});

document.querySelector('.keyboard').addEventListener('mouseup', (event) => {
  const button = keys.find((btn) => btn.en === event.target.innerText);
  if (button.code === 'ShiftRight' || button.code === 'ShiftLeft') {
    appState.shiftFlag = 'off';
    shift();
  }
});

function runOnKeys(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    // eslint-disable-next-line no-restricted-syntax
    for (const code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    appState.lang = func() === 'ru' ? 'en' : 'ru';
    keyboard.innerHTML = '';
    drawBoard();
    localStorage.setItem('lang', appState.lang);
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

runOnKeys(
  () => appState.lang,
  'ControlLeft',
  'AltLeft',
);
runOnKeys(
  () => appState.lang,
  'ControlRight',
  'AltRight',
);
runOnKeys(
  () => appState.lang,
  'ControlLeft',
  'AltRight',
);
runOnKeys(
  () => appState.lang,
  'ControlRight',
  'AltLeft',
);
