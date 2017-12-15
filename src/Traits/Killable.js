import {Sides, Trait} from '../Entity';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    kill(){
        this.dead = true;
    }

    revive () {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, deltaTime, sprites) {
        if (this.dead) {
            if (entity.name !== 'cosmo') {
                entity.pictures = entity.deadPic;
            } else {
                sprites.entities.delete(entity);
            }


            if (entity.name === 'purple') {
                entity.offset.y = -180;
            } else if (entity.name === 'green') {
                entity.offset.y = -62;
            }

            this.deadTime += deltaTime;

            if (this.deadTime > this.removeAfter) {
                sprites.entities.delete(entity);
            }
        }
    }
}
