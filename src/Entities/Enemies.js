import Entity, {Sides, Trait} from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';
import Killable from '../Traits/Killable';
import PendulumWalk from '../Traits/PendulumWalk';
import Physics from '../Traits/Physics';

class Behavior extends Trait{
    constructor() {
        super('behavior');
    }

    reachEdge(enemy) {

        console.log(enemy.pendulumWalk.speed);

    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.pendulumWalk.speed = 0;
                us.killable.kill();
                them.stomper.bounce();
            } else {
                them.killable.kill();
            }
        }
    }

    update(entity, deltaTime, sprites) {
        const sequence = Math.floor(entity.lifetime % entity.pictures.length);
        entity.picture = entity.pictures[sequence];
    }
}

export function createEnemiesFactory(sprites) {

    return function createEnemy(name, posX, posY,
                                      offsetX, offsetY,
                                      sizeX, sizeY,
                                      velX, velY,
                                      reverse, pictures, deadPic) {

        const enemy = new Entity(name);
        enemy.size.set(sizeX, sizeY);
        enemy.pos.set(posX, posY);
        enemy.vel.set(velX, velY);
        enemy.offset.set(offsetX, offsetY);
        enemy.pictures = reverse ? Array.from(pictures).reverse() : pictures;
        enemy.picture = null;
        enemy.deadPic = deadPic;

        enemy.addTrait(new Physics());
        enemy.addTrait(new PendulumWalk(reverse));
        enemy.addTrait(new Behavior());
        enemy.addTrait(new Killable());

        sprites.entities.add(enemy);
    };
}
