import KeyboardWrapper from './KeyboardWrapper';
import KeyboardController from './KeyboardController';
import EventInjector from './EventInjector';

const appState = {
  lang: 'ru',
  shiftFlag: 'off',
};

if (localStorage.getItem('lang') !== null) {
  appState.lang = localStorage.getItem('lang');
}

// INIT
const wrapper = new KeyboardWrapper();
wrapper.appendToBody();
const controller = new KeyboardController(appState, wrapper.keyboard, wrapper.text);

controller.drawBoard();

const events = new EventInjector(controller);

document.addEventListener('keydown', (e) => events.onKeyDown(e));

document.addEventListener('keyup', (e) => events.onKeyUp(e));

wrapper.keyboard.addEventListener('click', (e) => events.onClick(e));

wrapper.keyboard.addEventListener('mousedown', (e) => events.onMouseDown(e));

wrapper.keyboard.addEventListener('mouseup', (e) => events.onMouseUp(e));

const codes = [
  ['ControlLeft', 'AltLeft'],
  ['ControlRight', 'AltRight'],
  ['ControlLeft', 'AltRight'],
  ['ControlRight', 'AltLeft'],
];

codes.forEach((code) => events.runOnKeys(code));
