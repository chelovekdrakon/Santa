import Spritesheet from './spritesheet';
import {loadImage,loadJSON} from './loaders';

import Entity from './entity';
import {createCosmo} from './entities';

import Timer from './timer';

import {createCollisionLayer, drawBackground} from './layers';

import setupKeyboard from './input';
import {setupMouseControl} from './debug';


export default function drawField(context, canvas) {
    Promise.all([
        loadImage('./images/sprites.png'),
        loadJSON('./sprites'),
        loadJSON('./levels/1-1')
    ])
    .then(([image, data, layout]) => {

        const sprites = new Spritesheet(image, data, canvas, layout);

        for (let sprite in data) {
            sprites.define(sprite);
        }

        const cosmo = createCosmo();
        cosmo.pos.set(185, 420);
        // cosmo.vel.set(150, -600);
        cosmo.vel.set(0, -600);
        sprites.entities.add(cosmo);

        const bg = drawBackground(canvas, sprites);

        const drawCollisions = createCollisionLayer(sprites);

        const input = setupKeyboard(cosmo);
        input.listenTo(window);

        const timer = new Timer(1/60);

        timer.update = function update(deltaTime) {
                sprites.update(deltaTime);

                context.drawImage(bg, 0, 0);
                sprites.draw('boy1', context, cosmo.pos.x, cosmo.pos.y);

                drawCollisions(context);
        }
        timer.start();

        window.sprites = sprites;
    });
}
