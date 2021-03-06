import {Trait} from '../Entity';

export default class Falling extends Trait {
    constructor() {
        super('falling');
    }

    update(entity, deltaTime, sprites) {
        if (entity.pos.y > 800 && entity.stateCosmo.alive) {
            entity.playerController.death(entity, sprites);
            entity.sounds.playSound('fallInAbyss');
        }
    }
}
