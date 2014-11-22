function Object(m, coef)
{
    
    this.mass = m;
    this.cf = coef;
    this.xPos = (Math.random() * 10) - 5.0;
    this.yPos = 10.0;
    this.xVel = 0.0;
    this.yVel = 0.0;
    this.yAcc = -9.8;
    this.xAcc = 0.0;
    this.recentCollision = false;
    this.arrowRight = 0.0;
    this.arrowLeft = 0.0;
    
}

function beam(mass, length)
{
    
    this.mass = mass;
    this.tiltAngle = 0.0;
    this.radVel = 0.0;
    this.radAcc = 0.0;
    this.length = length;
    
}