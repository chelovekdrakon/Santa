import {Trait} from '../Entity';

export default class ReachEdge extends Trait {
    constructor() {
        super('reachEdge');
    }

    update(entity) {
        if (entity.pos.x < 0) {
                // entity.pos.x = 1;
        }
    }
}