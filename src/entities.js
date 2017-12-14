
import {createCosmoFactory} from './Entities/Cosmo';
import {createGreenFactory} from './Entities/Green';
import {createPurpleFactory} from './Entities/Purple';
import {createBlackFactory} from './Entities/Black';

import PlayerController from './Traits/PlayerController';

import setupKeyboard from './input';
import {setupMouseControl} from './debug';

export function createEntities(sprites, layout) {

    const createGreen = createGreenFactory(sprites);
    const createPurple = createPurpleFactory(sprites);
    const createBlack = createBlackFactory(sprites);


    layout.entities.forEach(entity => {
        entity.data.forEach(([x, y, reverse]) => {
          if (entity.name === 'green') {
            createGreen(x, y, reverse, entity.pictures, entity.deadPic);
          } else if (entity.name === 'purple') {
            createPurple(x, y, reverse, entity.pictures, entity.deadPic)
          } else if (entity.name === 'black') {
            createBlack(x, y, reverse, entity.pictures, entity.deadPic)
          }
        })
    });

    const createCosmo = createCosmoFactory(sprites);
    const cosmo = createCosmo();

    createPlayerEnv(cosmo);

    const input = setupKeyboard(cosmo);
    setupMouseControl(canvas, cosmo, sprites.camera);
    input.listenTo(window);
/*
    cosmo.slowAndTurbo = function setTurtleState(turboOn) {
      this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }    
*/
    // return cosmo;

}

function createPlayerEnv (playerEntity) {
    
    const playerControl = new PlayerController();
    playerControl.checkPoint.set(42, 42);
    playerEntity.addTrait(playerControl);
}
