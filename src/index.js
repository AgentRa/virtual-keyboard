// import keys from './keys';
import keys from './keys';


const appState = {
  lang: 'ru',
  shiftFlag: 'off',
};
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

function shift() {
  if (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 97
    || document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 65) {
    // eslint-disable-next-line no-unused-expressions
    (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() !== 97)
      ? keyboard.style.textTransform = 'none'
      : keyboard.style.textTransform = 'capitalize';
  }
  if (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 1060
    || document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 1092) {
    // eslint-disable-next-line no-unused-expressions
    (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() !== 1092)
      ? keyboard.style.textTransform = 'none'
      : keyboard.style.textTransform = 'capitalize';
  }
}


document.addEventListener('keydown', (event) => {
  // const keyboard = document.body.querySelector('.keyboard');
  const button = keys.find((btn) => btn.code === event.code);
  const key = document.querySelector(`div[keycode=${button.code}]`);
  key.style.background = 'linear-gradient(rgb(250, 250, 250), rgb(150, 160, 170))';
  if (button[appState.lang].length === 1) {
    text.value += `${key.innerText}`;
  }
  switch (button.code) {
    case 'CapsLock':
      // eslint-disable-next-line no-unused-expressions
      keyboard.style.textTransform !== 'capitalize'
        ? keyboard.style.textTransform = 'capitalize'
        : keyboard.style.textTransform = 'none';
      break;
    case 'ShiftRight':
    case 'ShiftLeft':
      // eslint-disable-next-line no-unused-expressions
      if (appState.shiftFlag === 'off') {
        appState.shiftFlag = 'on';
        shift();
      }
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      break;
    case 'Tab':
      event.preventDefault();
      text.value += '  ';
      console.log(appState.lang);
      break;
    case 'Backspace':
      // eslint-disable-next-line no-case-declarations,no-unused-vars
      const string = document.querySelector('textarea');
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
  // eslint-disable-next-line no-unused-vars
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
  switch (button.en) {
    case 'Caps Lock':
      // eslint-disable-next-line no-unused-expressions
      keyboard.style.textTransform !== 'capitalize'
        ? keyboard.style.textTransform = 'capitalize'
        : keyboard.style.textTransform = 'none';
      break;
    case 'Tab':
      event.preventDefault();
      text.value += '  ';
      break;
    case 'Backspace':
      // eslint-disable-next-line no-case-declarations,no-unused-vars
      const string = document.querySelector('textarea');
      string.value = string.value.substr(0, string.value.length - 1);
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
    // eslint-disable-next-line no-unused-expressions
    if (appState.shiftFlag === 'off') {
      appState.shiftFlag = 'on';
      shift();
    }
  }
});

document.querySelector('.keyboard').addEventListener('mouseup', (event) => {
  const button = keys.find((btn) => btn.en === event.target.innerText);
  if (button.code === 'CapsLock') console.log('batch');
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
    for (const code of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    // да, все

    // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
    // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
    // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново

    pressed.clear();
    // eslint-disable-next-line no-unused-expressions
    func() === 'ru' ? appState.lang = 'en' : appState.lang = 'ru';
    keyboard.innerHTML = '';
    drawBoard();
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
