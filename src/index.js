// import keys from './keys';
import keys from './keys';


const appState = {
  lang: 'ru',
};

const div = document.createElement('div');
div.className = 'wrapper';
document.body.append(div);
const text = document.createElement('textarea');
text.className = 'textarea';
document.body.querySelector('div').append(text);
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.querySelector('div').append(keyboard);

// eslint-disable-next-line no-restricted-syntax,guard-for-in
for (const key in keys) {
  const btn = document.createElement('div');
  btn.className = 'btn';
  btn.innerText = appState.lang === 'en' ? keys[key].en : keys[key].ru;
  btn.setAttribute('keyCode', keys[key].code);
  keyboard.appendChild(btn);
}
