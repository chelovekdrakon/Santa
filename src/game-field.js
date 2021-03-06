import Timer from './timer';
import createCollisionLayer from './layers/collision';
import createCameraLayer from './layers/camera';
import createPlayerEnvironment from './createPlayerEnvironment';
import {drawPauseScreen} from './drawInfo';

export default function drawField(context, sprites) {

    // const drawCollisions = createCollisionLayer(sprites);
    // const drawCameraView = createCameraLayer(sprites.camera);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        sprites.update(deltaTime, context);
        // drawCollisions(context, sprites.camera);
        // drawCameraView(context, sprites.camera);
    }
    timer.start();


    window.addEventListener('keypress', restart.bind(this, sprites));
    window.addEventListener('keypress', stopTimer.bind(this, timer, context));
}

const restart = async (sprites, e) => {
    if (e.code === 'KeyR') {
        sprites.level = 1;
        await sprites.createLevelCompositor();
    }
};

const stopTimer = (timer, context, e) => {
    if (e.code === 'KeyP') {
        if (timer._stop) {
            timer.start();
        } else {
            timer.stop();
            showPause(context);
        }
    }
};

const showPause = drawPauseScreen();
