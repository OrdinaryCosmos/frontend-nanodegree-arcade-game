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

    /* In order to make bug move at a different speed, a maximum pace is set at 300, and the speed the bug is moving
    at is a random number between 0-300.
     */

    var range=Math.random()*300;

    var posiran=Math.random()*range;//random is used two times to make its move more unpredictable.

    this.x+=dt*posiran;
    if (this.x>=505) {//if the bug move over the right edge of the frame, it will start from left side again
        this.x=0;
        this.y=Math.random()*250;//its reappearance's y position should be  random.
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    // Variables applied to the playable character,

    this.x=200;
    this.y=420;//character's starting point
    this.sprite = 'images/char-boy.png';

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//the update function decides how the character interact with other elements of the game
Player.prototype.update = function() {

    if (this.y<=0 || this.y >=421) {//the character can't move beyond the frame, once he reaches the edge, he will be reset to the starting point
        this.y=420;
        this.x=200;
    }
    for (var j in allEnemies) {// if sany of the enemies clash with the character, he will be reset to the starting point.
        if (Math.abs(allEnemies[j].x-this.x)<50 && Math.abs(allEnemies[j].y-this.y)<50) {
            this.x=200;
            this.y=420;
        }
    }
};

Player.prototype.handleInput=function(keycode){
// how the character moves in response to the keyboard input.

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


// Now instantiate the objects.
//  all enemy objects are put in an array called allEnemies
//  the player object is put in a variable called player
player=new Player();
allEnemies=[];
for (var i = 0, len = 5 ; i < len; i++) {
    var enemy=new Enemy();
    var ynum=Math.random()*250;
    var xnum=Math.random()*500;
    enemy.x=0-xnum;
    enemy.y=ynum;
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
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