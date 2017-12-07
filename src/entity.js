import {Vect} from './math';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update() {
        console.log('Update method is not provided');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vect(0,0);
        this.vel = new Vect(0,0);
        this.size = new Vect(0,0);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
        this.traits.forEach( trait => {
            trait.update(this, deltaTime);
        })
    }
}
