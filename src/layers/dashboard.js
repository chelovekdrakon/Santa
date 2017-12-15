export default function createDashboardLayer(entity) {
    return function drawDashboard(context) {

    	context.font = "22px Verdana";
    	context.strokeStyle = "yellow";
        context.strokeText(`lives : ${entity.stateCosmo.lives}`, 260, 22);
        context.strokeText(`level : 1`, 20, 22);
        context.strokeText(`coins : ${entity.stateCosmo.coins}`, 140, 22);

        if (!entity.stateCosmo.alive)  {
        	context.font = "50px Verdana";
    		context.strokeStyle = "red";
    		context.strokeText(`GAME OVER`, 350, 350);
        }
    }
}
