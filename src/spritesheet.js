import {Matrix} from './math';
import TileCollider from './TileCollider';
import Camera from './Camera';

export default class Spritesheet {
    constructor(image, data, canvas) {
        this.canvas = canvas;
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.entities = new Set();
        this.tilesMatrix = new Matrix();

        this.tileCollider = new TileCollider(this.tilesMatrix);

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

    drawCosmo(cosmo, context) {
        let buffer;

        if (cosmo.go.dir) {
            buffer = this.tiles.get(`boy2.png`)[cosmo.go.dir > 0 ? 0 : 1]
        } else {
            buffer = this.tiles.get(`boy1.png`)[0];
        }
        
        context.drawImage(buffer, cosmo.pos.x - this.camera.pos.x,
                                  cosmo.pos.y - this.camera.pos.y);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity, this.camera);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity, this.camera);

            entity.vel.y += this.gravity * deltaTime;
        });
    }
}
