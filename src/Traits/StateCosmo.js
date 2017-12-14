import {Trait} from '../entity';

export default class StateCosmo extends Trait {
    constructor() {
        super('stateCosmo');
        this.lives = 2;
        this.coins = 0;
        this.keys = 0;
        this.opebedLocks = 0;
    }

    update(entity, deltaTime, sprites) {

        if (this.lives == 0) {
            console.log('game over');
        }
        
    }
}
