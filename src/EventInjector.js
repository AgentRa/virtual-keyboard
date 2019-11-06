import keys from './keys';

export default class EventInjector {
  constructor(controller) {
    this.ctrl = controller;
  }

  onKeyDown(event) {
    const {
      keyboard, state, shift, text,
    } = this.ctrl;
    const button = keys.find((btn) => btn.code === event.code);
    const key = document.querySelector(`div[keycode=${button.code}]`);
    key.style.background = 'linear-gradient(rgb(250, 250, 250), rgb(150, 160, 170))';
    if (button[state.lang].length === 1) {
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
        if (state.shiftFlag === 'off') {
          state.shiftFlag = 'on';
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
        text.value = text.value.substr(0, text.value.length - 1);
        break;
      case 'Enter':
        text.value += '\n';
        break;
      default:
        break;
    }
  }

  onKeyUp(event) {
    const { state, shift } = this.ctrl;
    const button = keys.find((btn) => btn.code === event.code);
    const key = document.querySelector(`div[keycode=${button.code}]`);
    key.style.background = 'rgb(243, 243, 243)';
    if (button.en === 'Shift') {
      state.shiftFlag = 'off';
      shift();
    }
  }

  onClick(event) {
    const { keyboard, text } = this.ctrl;
    if (event.target.className !== 'keyboard' && event.target.innerText.length === 1) {
      text.value += `${event.target.innerText}`;
    }
    const button = keys.find((btn) => btn.en === event.target.innerText);
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
        text.value = text.value.substr(0, text.value.length - 1);
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
  }

  onMouseDown(event) {
    const { state, shift } = this.ctrl;
    const button = keys.find((btn) => btn.en === event.target.innerText);
    if (button.en === 'Shift') {
      if (state.shiftFlag === 'off') {
        state.shiftFlag = 'on';
        shift();
      }
    }
  }

  onMouseUp(event) {
    const { state, shift } = this.ctrl;
    const button = keys.find((btn) => btn.en === event.target.innerText);
    if (button.code === 'ShiftRight' || button.code === 'ShiftLeft') {
      state.shiftFlag = 'off';
      shift();
    }
  }

  runOnKeys(codes) {
    const { state, keyboard, drawBoard } = this.ctrl;
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
      state.lang = state.lang === 'ru' ? 'en' : 'ru';
      keyboard.innerHTML = '';
      drawBoard();
      localStorage.setItem('lang', state.lang);
    });

    document.addEventListener('keyup', (event) => {
      pressed.delete(event.code);
    });
  }
}
