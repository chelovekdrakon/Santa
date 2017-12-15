import Sprite from './Sprite';
import Font from './Font';
import {loadImage,loadJSON} from './loaders';
import {createEntities} from './entities';
import Timer from './timer';

import createCollisionLayer from './layers/collision';
import drawBackground from './layers/background';
import createCameraLayer from './layers/camera';
import createDashboardLayer from './layers/dashboard';

export default function drawField(context, canvas) {
    Promise.all([
        loadImage('./images/sprites.png'),
        loadJSON('./sprites'),
        loadJSON('./levels/1-2'),
        loadJSON('./alphabet'),
        loadImage('./images/alphabet.png')
    ])
    .then(([tileImage, tileData, layout, fontData, fontsData]) => {

        const sprites = new Sprite(tileImage, tileData);
        for (let sprite in tileData) {
            sprites.define(sprite);
        }

        const font = new Font(fontsData, fontData);
        for (let letter in fontData) {
            font.define(letter);
        }

        const drawBackgroundLayer = drawBackground(sprites, layout);
        createEntities(sprites, layout);

        const drawCollisions = createCollisionLayer(sprites);
        const drawCameraView = createCameraLayer(sprites.camera);

        const cosmo = sprites.getEntityByName('cosmo');

        const dashboard = createDashboardLayer(cosmo);

/*
        const input = setupKeyboard(cosmo);
        setupMouseControl(canvas, cosmo, sprites.camera);
        input.listenTo(window);

*/
        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {

                drawBackgroundLayer(context);
                sprites.update(deltaTime, context);
                font.print('!@#$%*,', context, 0, 100, 90, 90);
                font.print('1234567890', context, 0, 200, 90, 90);
                font.print('QWERTYUIOP', context, 0, 300, 90, 90);
                font.print('ASDFGHJKL', context, 0, 400, 90, 90);
                font.print('ZXCVBNM', context, 0, 500, 90, 90);

                drawCollisions(context, sprites.camera);
                drawCameraView(context, sprites.camera);

                dashboard(context);
        }
        timer.start();

        // window.sprites = sprites;
    });
}


function getByName(name) {

}
