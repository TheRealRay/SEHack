var objects = [];
var beam = new beam(20.0, 0.0, 10.0);
var interval = 0.05;

$(document).ready(function(){

    var player = new Object(8.0, 1.0);

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
    
    draw();
    
}

function updateAcceleration()
{
    
    for(var i = 0; i < objects.length; i++)
    {
    
        if(!onBeam(objects[i].xPos, objects[i].yPos))
        {
            objects[i].yAcc = -9.8;
            objects[i].xAcc = 0.0;
        }
            
        else
        {
            
            
            
        }
    
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