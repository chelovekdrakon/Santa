import {Trait} from '../Entity';

export default class StateCosmo extends Trait {
    constructor() {
        super('stateCosmo');
        this.lives = 3;
        this.coins = 0;
        this.keys = 0;
        this.opebedLocks = 0;
        this.alive = true;
    }

    update(entity, deltaTime, sprites) {

        if (this.lives === 0) {
            this.alive = false;
        }

        if (this.coins > 100) {
            this.coins = 0;
            this.lives++;
        }


    }
}
