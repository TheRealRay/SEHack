var objects = [];
var beam = new beam(20.0, 10.0);
var interval = 0.05;

$(document).ready(function(){

    var player = new Object(8.0, 0.5);

    player.yPos = 0.0;
    player.xPos = 0.0;

    objects.push(player);

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
            objects[i].yAcc = -9.8;
            objects[i].xAcc = 0.0;
        }
            
        else
        {
            objects[i].xAcc += ((objects[i].arrowRight - objects[i].arrowRight) * 15.0);
         
            objects[i].yAcc += (9.8*Math.sin(beam.angle)*Math.sin(beam.angle));
            objects[i].xAcc += (9.8*Math.sin(beam.angle)*Math.cos(beam.angle));
            
            objects[i].yAcc += -1.0*(9.8*Math.cos(beam.angle)*Math.sin(beam.angle)*object[i].cf*object[i].yVel/abs(object[i].yVel));
            objects[i].xAcc += -1.0*(9.8*Math.cos(beam.angle)*Math.cos(beam.angle)*object[i].cf*object[i].xVel/abs(object[i].xVel));
            
            objects[i].yAcc = (-1*objects[i].yVel * Math.cos(beam.angle)/interval);
            objects[i].xAcc = (-1*objects[i].xVel * Math.sin(beam.angle)/interval);
            
            torque += Math.sqrt(objects[i].xAcc*objects[i].xAcc + objects[i].yAcc*objects[i].yAcc)*objects[i].mass
                    *Math.sqrt(objects[i].yPos*objects[i].yPos + objects[i].xPos * objects[i].xPos)*objects[i].xPos/abs(objects[i].xPos); //last entry to check if negative
            
            torque += objects[i].mass * 9.8 * Math.cos(beam.angle) * Math.sqrt(objects[i].yPos*objects[i].yPos + objects[i].xPos * objects[i].xPos)
                    * objects[i].xPos/abs(objects[i].xPos);
            
        }
        
        beam.radAcc = torque / beam.length*beam.length*beam.mass*(1.0/12.0);
    
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
    
    if(abs(yPos) > abs(Math.tan(xPos - 0.05)) && abs(yPos) > abs(Math.tan(xPos - 0.05)) && Math.sqrt(yPos*yPos + xPos * xPos) <= beam.length)
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