import TileResolver from './TileResolver';
import {Sides} from './Entity';

export default class TileCollider {
    constructor(tileLayout) {
        this.tiles = new TileResolver(tileLayout);
    }

    checkX(entity, camera) {
        if (entity.pos.x < 0 ) {
            entity.pos.x = 0;
        }
         if (entity.bounds.right > this.tiles.tileSize * this.tiles.matrix.grid.length) {
            entity.pos.x = this.tiles.tileSize * this.tiles.matrix.grid.length - entity.size.x;
        }

        let x;
        if (entity.vel.x > 0) {    
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(x, x,
                                                 entity.bounds.top,
                                                 entity.bounds.bottom);

        matches.forEach( match => {
            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.bounds.right = match.x1;
                    entity.vel.x = 0;

                    entity.obstruct(Sides.RIGHT);
                }
            } else if (entity.vel.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.bounds.left = match.x2;
                    entity.vel.x = 0;

                    entity.obstruct(Sides.LEFT);
                }

            }
        });
    }

    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(entity.bounds.left,
                                                 entity.bounds.right,
                                                 y, y);

        matches.forEach( (match, i, arr) => {
            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.bounds.bottom = match.y1;
                    entity.vel.y = 0;
                    // console.log('matches BOTTOM');

                    entity.obstruct(Sides.BOTTOM);

                }
            } else if (entity.vel.y < 0) {
                if (entity.bounds.top < match.y2) {

                    if (this.checkToExtra(match)) {
                        entity.stateCosmo.coins++;
                        arr.splice(0,1);
                         console.log('matches TOP', this.tiles.matrix.grid);
                     } else {
                        entity.bounds.top = match.y2;
                        entity.vel.y = 0;
                        entity.obstruct(Sides.TOP);
                     }
                }

            }
        });
    }

    checkToExtra (match) {
        if (match.tile.name.includes('coin') || match.tile.name.includes('key')) {
            return true;
        }
    }
}
