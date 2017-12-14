import {Trait} from '../entity';
import {Vect} from '../math';

export default class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.player = null;
        this.checkPoint = new Vect(42, 42);
    }

    update(entity, deltaTime, sprites) {
        this.player = entity;

        if (!sprites.entities.has(entity) && entity.stateCosmo.lives > 0) {
            
            entity.stateCosmo.lives--;
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            sprites.entities.add(this.player);
       }
        
    }
}
