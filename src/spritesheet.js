import Camera from './Camera';

export default class Spritesheet {
    constructor(image, data) {
        this.image = image;
        this.data = data;
        this.tiles = new Map();

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

        x = x * buffer.width;
        y = y * buffer.width;

        context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
    }

    drawTiles(name, context, type, x1, x2, y1, y2) {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                this.draw(name, context, x, y, type);
            }
        }
    }

    getEntityByName(name) {
        let searchigEntity;
        this.entities.forEach(value => {
            if (value.name == name) {
                searchigEntity = value;
            }
        });
        return searchigEntity;
    }

    update(deltaTime, context) {

    }
}
