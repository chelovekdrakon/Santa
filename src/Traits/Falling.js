import {Trait} from '../entity';

export default class Falling extends Trait {
    constructor() {
        super('falling');
        this.dir = 0;
    }

    update(entity) {
        let currentX = entity.pos.x;
        if (entity.pos.y > 800 && entity.stateCosmo.lives > 0) {

            entity.pos.y = 100;
            entity.pos.x = currentX - 65;
            entity.stateCosmo.lives--;
            } 
    }
}
