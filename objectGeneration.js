function createObject()
{
    
    var m, coef;
    
    var randomNumber = Math.random() * 2;
    
    if(randomNumber > 1)
        m = 1.0;
    else
        m = 2.0;
    
   randomNumber = Math.random() * 2;
   
   if(randomNumber > 1)
       coef = 0.8
   else
       coef = 0.4
   
   var object = new Object(m, coef);
    
   return object; 
    
}

