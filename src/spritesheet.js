import Camera from './Camera';

export default class Spritesheet {
    constructor(image, data) {
        this.image = image;
        this.data = data;
        this.tiles = new Map();

        this.camera = new Camera();
        this.TILE_SIZE = 37;
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

            if (png['w'] < this.TILE_SIZE && png['h'] < this.TILE_SIZE && !name.includes('enemy')) {
                buffer.width = this.TILE_SIZE;
                buffer.height = this.TILE_SIZE; 
                let deltaX = (this.TILE_SIZE - png['w'])/2;
                let deltaY = (this.TILE_SIZE - png['h'])/2;
                context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'],
                                               deltaX,  deltaY,   png['w'], png['h']);
            } else {
                context.drawImage(this.image, png['x'], png['y'], png['w'], png['h'],
                                             0,         0,        png['w'], png['h']);
            }
            return buffer;
        });
        this.tiles.set(name, buffers);
    }
/* this method can be deleted? i don't know where we can use it  BUT may be it for fonts??? */
    draw(name, context, x, y, type, flip) {
        // console.log('draeeeeeeeeeeeeeeeeeew', name);
        // const buffer = this.tiles.get(`${name}.png`)[flip ? 1 : 0];

        // x = x * buffer.width;
        // y = y * buffer.width;

        // context.drawImage(buffer, x - this.camera.pos.x, y - this.camera.pos.y);
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
