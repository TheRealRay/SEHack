var canvas;
var surface
var currentScreen;
var mainGameScreen;
var mouse;
var fullCircle = Math.PI * 2;

function beginLoop() {
    var frameId = 0;
    var lastFrame = Date.now();

    function loop() {
        var thisFrame = Date.now();

        var elapsed = thisFrame - lastFrame;

        frameId = window.requestAnimationFrame(loop);

        currentScreen.update(elapsed);
        currentScreen.draw(surface);

        lastFrame = thisFrame;
    }

    loop();
}

canvas = document.querySelector('canvas#main-canvas');
canvas.setAttribute('width', 600);
canvas.setAttribute('height',400);

surface = canvas.getContext('2d');

mouse = (function (target) {
    var isButtonDown = false;

    target.addEventListener('mousedown', function () {
        isButtonDown = true;
    });
    target.addEventListener('mouseup', function () {
        isButtonDown = false;
    });

    return {
        isButtonDown: function () {
            return isButtonDown;
        }
    };
}(document));

function makeEnemyShip(x, y) {
    var position = {
        x: x,
        y: y
    };

    var turnSpeed = fullCircle / 200;
    var speed = 2;
    var orientation = 0;
    var target = findNewTarget();    

    function draw(ctx) {
        ctx.save();

        ctx.translate(position.x, position.y);
        ctx.rotate(orientation);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(-3, -1, 6, 2);
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.arc(target.x, target.y, 2, 0, Math.PI * 2, true);
        ctx.fill();
    }

    function update(elapsed) {
        var y = target.y - position.y;
        var x = target.x - position.x;
        var d2 = Math.pow(x, 2) + Math.pow(y, 2);
        if (d2 < 16) {
            target = findNewTarget();
        } else {

            var angle = Math.atan2(y, x);
            var delta = angle - orientation;
            var delta_abs = Math.abs(delta);

            if (delta_abs > Math.PI) {
                delta = delta_abs - fullCircle;
            }

            if (delta !== 0) {
                var direction = delta / delta_abs;
                orientation += (direction * Math.min(turnSpeed, delta_abs));
            }
            orientation %= fullCircle;

            position.x += Math.cos(orientation) * speed;
            position.y += Math.sin(orientation) * speed;
        }

    }

    function findNewTarget() {
        var target = {
            x: Math.round(Math.random() * 600),
            y: Math.round(Math.random() * 300)
        };

        return target;
    }

    return {
        draw: draw,
        update: update
    }
}

// define the main screen for the game
mainGameScreen = (function () {
	var xinit = Math.round(Math.random() * 600);
    var inity = 0;

    function start() {

        for (var i = 0; i <= numOfEnemyShips; i++) {
            entities.push(makeEnemyShip(i * 10, i));
        }
    }

    function draw(ctx) {
    	
    	var y = inity + 1
    	inity = y;
    	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(ctx.canvas.width/4, ctx.canvas.height/2+5, ctx.canvas.width/2, 5);

        ctx.fillRect(xinit, y, 5, 5);
        if (inity == ctx.canvas.height/2+5){
        	inity = 0;
        	xinit = Math.round(Math.random() * 600);
        }
    }

    function update(elapsed) {
        
    }

    return {
        draw: draw,
        update: update,
        start: start
    };
}());

// define the start screen
currentScreen = (function (input) {

    var hue = 0;
    var direction = 1;
    var transitioning = false;
    var wasButtonDown = false;
    var title = 'My Awesome Game';

    function centerText(ctx, text, y) {
        var measurement = ctx.measureText(text);
        var x = (ctx.canvas.width - measurement.width) / 2;
        ctx.fillText(text, x, y);
    }

    function draw(ctx, ) {

        var y = ctx.canvas.height / 2;
        var color = 'rgb(' + hue + ',0,0)';

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '48px Helvetica';
        centerText(ctx, title, y);

        ctx.fillStyle = color;
        ctx.font = '24px Helvetica';
        centerText(ctx, 'click to begin', y + 30);
    }

    function update() {

        hue += 1 * direction;
        if (hue > 255) direction = -1;
        if (hue < 1) direction = 1;

        var isButtonDown = input.isButtonDown();
        var mouseJustClicked = !isButtonDown && wasButtonDown;

        if (mouseJustClicked && !transitioning) {
            transitioning = true;
            currentScreen = mainGameScreen;
            currentScreen.start();
        }

        wasButtonDown = isButtonDown;
    }

    return {
        draw: draw,
        update: update
    };
}(mouse));


beginLoop();