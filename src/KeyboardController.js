import keys from './keys';

export default class KeyboardController {
  constructor(state, keyboard, text) {
    this.keyboard = keyboard;
    this.text = text;
    this.state = state;
  }

  drawBoard() {
    if (this.state.shiftFlag === 'off') {
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in keys) {
        const btn = document.createElement('div');
        btn.className = 'btn';
        btn.innerText = this.state.lang === 'en' ? keys[key].en : keys[key].ru;
        btn.setAttribute('keyCode', keys[key].code);
        this.keyboard.appendChild(btn);
      }
    } else {
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in keys) {
        const btn = document.createElement('div');
        btn.className = 'btn';
        if (this.state.lang === 'ru') {
          btn.innerText = (keys[key].ruSpec) ? keys[key].ruSpec : keys[key].ru;
          btn.setAttribute('keyCode', keys[key].code);
          this.keyboard.appendChild(btn);
        } else {
          btn.innerText = (keys[key].enSpec) ? keys[key].enSpec : keys[key].en;
          btn.setAttribute('keyCode', keys[key].code);
          this.keyboard.appendChild(btn);
        }
      }
    }
  }

  shift() {
    if (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 97
      || document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 65) {
      this.keyboard.style.textTransform = (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() !== 97)
        ? 'none'
        : 'capitalize';
    }
    if (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 1060
      || document.querySelector('div[keycode=KeyA').innerText.charCodeAt() === 1092) {
      this.keyboard.style.textTransform = (document.querySelector('div[keycode=KeyA').innerText.charCodeAt() !== 1092)
        ? 'none'
        : 'capitalize';
    }
    if (this.state.shiftFlag === 'on') {
      this.keyboard.innerHTML = '';
      this.drawBoard();
    }
    this.keyboard.innerHTML = '';
    this.drawBoard();
  }
}
