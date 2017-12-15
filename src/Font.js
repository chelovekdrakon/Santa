import Spritesheet from './spritesheet'

export default class Font extends Spritesheet {
    constructor(image,data) {
        super(image, data);
    }

    print(text, context, x, y, sizeX, sizeY, flip) {
        [...text].forEach( (letter, index) => {
            const buffer = this.tiles.get(`${letter}.png`)[flip ? 1 : 0];

            context.drawImage(buffer, x + index * sizeX, y, sizeX, sizeY);
        });
    }
}
