var objects = [];
var beam = new beam(20.0, 10.0);
var interval = 0.05;
var gravityConstant = 0.2;

$(document).ready(function(){

    var player = new Object(8.0, 0.5);

    player.yPos = 0.0;
    player.xPos = 0.0;

    objects.push(player);

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
             objects[0].arrowAcc = -1.0;
        }
        else if(event.keyCode == 39) {
             objects[0].arrowAcc = 1.0;
         }
         });

    var objectAddition = setInterval(function(){addNewObject()}, 100);

    var physicsEngine = setInterval(function(){physics()}, interval*1000);

});

function addNewObject()
{
    
    if(objectFall() === true)
        objects.push(createObject());
        
}

function objectFall()
{
    
    var fall = false;
    
    var randomNumber = Math.random() * 10;
    
    if(randomNumber > 9)
        fall = true;
    
    return fall;
    
}

function physics()
{
    
    updateAcceleration();
    updateVelocity();
    updatePosition();
        
    removeObjects();   
    
    updateBeamVelandPos();
    
    draw(objects, beam);
    
}

function updateAcceleration()
{
    
    for(var i = 0; i < objects.length; i++)
    {
    
        var torque = 0.0;
    
        if(!onBeam(objects[i].xPos, objects[i].yPos))
        {
            objects[i].yAcc = -1.0*gravityConst;
            objects[i].xAcc = 0.0;
        }
            
        else
        {

            objects[i].xAcc = 0.0;
            objects[i].yAcc = 0.0;
          
            objects[i].xAcc += ((object[i].arrowAcc) * 15.0);
         
            objects[i].yAcc += (gravityConst*Math.sin(beam.angle)*Math.sin(beam.angle));
            objects[i].xAcc += (gravityConst*Math.sin(beam.angle)*Math.cos(beam.angle));
            
            objects[i].yAcc += -1.0*(gravityConst*Math.cos(beam.angle)*abs(Math.sin(beam.angle))*object[i].cf*object[i].yVel/abs(object[i].yVel));
            objects[i].xAcc += -1.0*(gravityConst*Math.cos(beam.angle)*Math.cos(beam.angle)*object[i].cf*object[i].xVel/abs(object[i].xVel));
            
            objects[i].yAcc += (-1.0 * objects[i].yVel / interval);
            objects[i].xAcc += (-1.0 * objects[i].xVel / interval);
            
            torque += Math.sqrt(objects[i].xAcc*objects[i].xAcc + objects[i].yAcc*objects[i].yAcc)*objects[i].mass
                    *Math.sqrt(objects[i].yPos*objects[i].yPos + objects[i].xPos * objects[i].xPos)*objects[i].xPos/abs(objects[i].xPos); //last entry to check if negative
            
            torque += objects[i].mass * gravityConst * Math.cos(beam.angle) * Math.sqrt(objects[i].yPos*objects[i].yPos + objects[i].xPos * objects[i].xPos)
                    * objects[i].xPos/abs(objects[i].xPos);
            
        }
        
        beam.radAcc = torque / (beam.length*beam.length*beam.mass*(1.0/12.0));
    
}

function updateVelocity()
{
    
    for(var i = 0; i < objects.length; i++)
    {
    
        objects[i].xVel += objects[i].xAcc * interval;
        objects[i].yVel += objects[i].yAcc * interval;
    
    }
    
}

function updatePosition()
{
    
    for(var i = 0; i < objects.length; i++)
    {
    
        objects[i].xPos += objects[i].xVel * interval;
        objects[i].yPos += objects[i].yVel * interval;
    
    }
    
}

function removeObjects()
{
    
    for(var i = 0; i < objects.length; i++)
        if(objects[i].yPos < -10.0)
            {
                objects[i].splice(i, 1);
                if(i === 0)
                    gameLost();
                i--;
            }
    
}

function onBeam(xPos, yPos)
{
    
    if(abs(yPos/xPos + Math.tan(beam.angle) < 0.1) && Math.sqrt(yPos*yPos + xPos * xPos) <= beam.length)
        return true;
    else
        return false;
    
}

function updateBeamVelAndPos()
{
    
    beam.radVel += beam.radAcc * interval;
    beam.angle += beam.radAcc * interval;
    
}

function gameLost()
{
    
    clearInterval(objectAddition);
    clearInterval(physicsEngine);
    
    alert("Game over. Your skill is not enough.");
    
}