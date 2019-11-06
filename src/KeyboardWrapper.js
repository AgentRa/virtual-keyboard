export default class KeyboardWrapper {
  constructor() {
    this.wrapper = null;
    this.keyboard = null;
    this.text = null;
    this.init();
  }

  appendToBody() {
    document.body.append(this.wrapper);
  }

  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper';
    this.text = document.createElement('textarea');
    this.text.className = 'textarea';
    this.text.setAttribute('disabled', 'disabled');

    this.keyboard = document.createElement('div');
    this.keyboard.className = 'keyboard';
    this.wrapper.append(this.text, this.keyboard);
  }
}
