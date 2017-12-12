import TileResolver from './TileResolver';
import {Sides} from './Entity';


export default class TileCollider {
    constructor(tileLayout) {
        this.tiles = new TileResolver(tileLayout);
    }

    checkX(entity, camera) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
            x = entity.pos.x;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(x, x,
                                                 entity.pos.y,
                                                 entity.pos.y + entity.size.y);

        matches.forEach( match => {
            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;

                    entity.obstruct(Sides.RIGHT);
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;

                    entity.obstruct(Sides.LEFT);
                }

            }
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
            y = entity.pos.y;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(entity.pos.x,
                                                 entity.pos.x + entity.size.x,
                                                 y, y);

        matches.forEach( match => {
            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;

                    entity.obstruct(Sides.FLOOR);
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;

                    entity.obstruct(Sides.CEILING);
                }

            }
        });
    }
}
