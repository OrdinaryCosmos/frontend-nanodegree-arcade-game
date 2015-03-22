// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=0;
    this.y=0;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var range=Math.random()*300

    var posiran=Math.random()*range;

    this.x+=dt*posiran;
    if (this.x>=505) {
        this.x=0;
        this.y=Math.random()*250;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=200;
    this.y=420;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameterx
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y<=0 || this.y >=421) {
        this.y=420;
        this.x=200;
    }
    for (var j in allEnemies) {
        if (Math.abs(allEnemies[j].x-this.x)<50 && Math.abs(allEnemies[j].y-this.y)<50) {
            this.x=200;
            this.y=420;
        }
    }
};

Player.prototype.handleInput=function(keycode){


    if (keycode==='left') {
        this.x-=50;
    }
    else if (keycode==='right') {
        this.x+=50;

    } else if (keycode==='up') {
        this.y-=50;
    }else if (keycode==='down'){
        this.y+=50;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

player=new Player();
allEnemies=[];
for (var i = 0, len = 5 ; i < len; i++) {
    var enemy=new Enemy();
    var ynum=Math.random()*250;
    var xnum=Math.random()*500;
    enemy.x=0-xnum;
    enemy.y=ynum;
    allEnemies.push(enemy);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


document.addEventListener('keydown', function (e) {
    e.preventDefault();
});