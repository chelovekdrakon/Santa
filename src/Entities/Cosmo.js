import Entity from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';
import Stomper from '../Traits/Stomper';
import Killable from '../Traits/Killable'
import ReachEdge from '../Traits/ReachEdge';


const SLOW_DRAG = 1/2000;
const FAST_DRAG = 1/5000;

export function createCosmoFactory(sprites) {

    function setTurboState(turtleOn) {
      this.go.dragFactor = turtleOn ? SLOW_DRAG : FAST_DRAG;
    }

    function setTurtleState(turboOn) {
      this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    return function createCosmo() {
        const cosmo = new Entity('cosmo');

        cosmo.size.set(37, 50);

        cosmo.pos.set(185, 420);
        cosmo.vel.set(0, -600);

        sprites.entities.add(cosmo);

        cosmo.addTrait(new Jump());
        cosmo.addTrait(new Go());
        cosmo.addTrait(new ReachEdge());
        cosmo.addTrait(new Stomper());
        cosmo.addTrait(new Killable());


        cosmo.turboAndSlow = setTurboState;
        cosmo.slowAndTurbo = setTurtleState;


        return cosmo;
    };
}
