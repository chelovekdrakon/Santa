import Entity, {Sides, Trait} from '../Entity';
import Killable from '../Traits/Killable';
// import Physics from '../Traits/Physics';

class Behavior extends Trait{
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            us.killable.removeAfter = 0;
            us.killable.kill();
            if (us.name.includes('coin')) {
                them.stateCosmo.coins++;
            } else if (us.name.includes('key')) {
                them.stateCosmo.keys++;
            }
            
        }
    }
}

export function createArtefactsFactory(sprites) {

    return function createArtefact(name, posX, posY,
                                    // sizeX, sizeY,
                                    picture) {

        const artefact = new Entity(name);
        artefact.size.set(23, 23);               //!!! resolve 
        artefact.pos.set(posX * 37, posY * 37);  //!!! resolve 
        artefact.offset.set(7, 7);
        artefact.picture = picture;

        artefact.addTrait(new Killable());
        artefact.addTrait(new Behavior());
        sprites.entities.add(artefact);
    };
}
