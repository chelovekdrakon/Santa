export default class Artefact {
    constructor(name) {
        this.name = name;
        this.pos = new Vect(0,0);

        this.bounds = new BoundingBox(this.pos, this.size, this.offset);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach( trait => {
            trait.obstruct(this, side);
        });
    }

    collides(candidate) {
        this.traits.forEach( trait => {
            trait.collides(this, candidate);
        });
    }

    update(deltaTime, sprites) {
        this.traits.forEach( trait => {
            trait.update(this, deltaTime, sprites);
        })

        this.lifetime += deltaTime;
    }
}