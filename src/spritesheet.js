import {Matrix} from './math';
import TileCollider from './TileCollider';
import EntityCollider from './EntityCollider';
import Camera from './Camera';
import {createAnimation} from './animations';

export default class Spritesheet {
    constructor(image, data, canvas) {
        this.canvas = canvas;
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.entities = new Set();
        this.tilesMatrix = new Matrix();

        this.tileCollider = new TileCollider(this.tilesMatrix);
        this.entityCollider = new EntityCollider(this.entities);

        this.gravity = 2000;
        this.camera = new Camera();
    }

    define(name) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas');
            const context = buffer.getContext('2d');

            const png = this.data[`${name}`].frame;
            buffer.width = png['w'];
            buffer.height = png['h'];

            if (flip) {
                context.scale(-1, 1);
                context.translate(-buffer.width, 0);
            }

            context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'],
                                          0,        0,        png['w'], png['h']);
            return buffer;
        });
        this.tiles.set(name, buffers);
    }

    draw(name, context, x, y, type, flip) {
        const buffer = this.tiles.get(`${name}.png`)[flip ? 1 : 0];

        if (type) {
            if (type === 'tile' || 'dec-tile') {
                this.tilesMatrix.set(x, y, {
                    'name': name,
                    'type': type
                });
            }

            x = x * buffer.width;
            y = y * buffer.width;
        }

        context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawTiles(name, context, type, x1, x2, y1, y2) {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                this.draw(name, context, x, y, type);
            }
        }
    }

    drawEntity (name, context, x, y, flip = false) {
            const buffer = this.tiles.get(nameTile)[flip ? 0 : 1];
            context.drawImage(buffer, x, y);
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

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity, this.camera);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity, this.camera);

            entity.vel.y += this.gravity * deltaTime;

            if (entity.name === 'cosmo') {
                this.drawCosmo(entity, context);

                // if (entity.pos.x > 300) {
                //     this.camera.pos.x = entity.pos.x - 300;
                // }

                this.camera.pos.x = Math.max(0, entity.pos.x - 300);

            } else if (entity.name !== 'cosmo') {
                this.draw(entity.picture, context, entity.pos.x, entity.pos.y)
            }
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });
    }
}
