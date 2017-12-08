export function createCollisionLayer(sprites) {

    const resolvedTiles = [];

    const tileResolver = sprites.tileCollider.tiles;
    const tileSize = tileResolver.tileSize

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x,y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisions(context) {

        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x,y}) => {
            context.beginPath();
            context.rect(x * tileSize,
                         y * tileSize,
                         tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';
        sprites.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x,  entity.pos.y,
                         entity.size.x, entity.size.y);
            context.stroke();
        })

        resolvedTiles.length = 0;
    };
}

export function drawBackground(canvas, sprites) {
    const buffer = document.createElement('canvas');
    const bufferContext = buffer.getContext('2d');
    buffer.setAttribute('width', canvas.width);
    buffer.setAttribute('height', canvas.height);

    sprites.tilesLayout.backgrounds.forEach( tile => {
        const name = tile.name;
        tile.pos.forEach(([x1, x2, y1, y2]) => {
            sprites.drawTiles(name, bufferContext, x1, x2, y1, y2);
        });
    });

    return buffer;
}
