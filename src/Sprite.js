import {Matrix} from './math';
import TileCollider from './TileCollider';
import EntityCollider from './EntityCollider';
import {createAnimation} from './animations';
import Spritesheet from './spritesheet'

export default class Sprite extends Spritesheet {
    constructor(image, data) {
        super(image, data);

        this.entities = new Set();
        this.tilesMatrix = new Matrix();

        this.tileCollider = new TileCollider(this.tilesMatrix);
        this.entityCollider = new EntityCollider(this.entities);

        this.gravity = 2000;
        this.level = 1;
    }

    draw(name, context, x, y, type, flip) {


        const buffer = this.tiles.get(`${name}.png`)[flip ? 1 : 0];

        if (type) {
            if (type !== 'decor') {
                this.tilesMatrix.set(x, y, {
                    'name': name,
                    'type': type
                });
            }
        if (name.includes('coin') || name.includes('key')) {
                x = x * this.TILE_SIZE;
                y = y * this.TILE_SIZE;
            } else {
                x = x * buffer.width;
                y = y * buffer.height;
            }
        }

        context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawEntity (name, context, x, y, flip = false) {
            const buffer = this.tiles.get(`${name}.png`)[flip ? 0 : 1];
            context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawCosmo(cosmo, context) {
        let buffer;

        let frames = ['boy4.png', 'boy3.png', 'boy2.png', 'boy1.png'];

        let runAnim = createAnimation(frames, 5);

        function routeFrame (cosmo) {
            if (cosmo.jump.ready < 0) {
                return 'boy3.png';
            }
            if (cosmo.go.distance > 0) {
               return runAnim(cosmo.go.distance);
            }
            return 'boy1.png';
        }

        buffer = this.tiles.get(routeFrame (cosmo))[cosmo.go.heading > 0 ? 0 : 1];

        context.drawImage(buffer, cosmo.pos.x - this.camera.pos.x,
                                  cosmo.pos.y - this.camera.pos.y);
    }

    update(deltaTime, context) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);

            if (entity.name === 'cosmo') {
                this.drawCosmo(entity, context);
                this.camera.pos.x = entity.pos.x > 3040 ? 2740 : Math.max(0, entity.pos.x - 300);

            } else if (entity.name.includes('key') || entity.name.includes('coin') || entity.name.includes('lock')) {
                this.draw(entity.name, context, entity.pos.x , entity.pos.y )

            } else if (entity.name !== 'cosmo') {
                this.drawEntity(entity.picture, context, entity.pos.x, entity.pos.y, entity.pendulumWalk.speed > 0 ? 0 : 1);
            }
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });
    }
}
