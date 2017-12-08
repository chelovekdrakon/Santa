import drawField from './game-field';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// canvas.setAttribute('width', `${window.devicePixelRatio}` * 960);
// canvas.setAttribute('height', `${window.devicePixelRatio}` * 640);
// canvas.style.width = `960px`;
// canvas.style.height = `640px`;
//
const width = 37 * 100;
const height = 37 * 17;
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

drawField(context, canvas);
