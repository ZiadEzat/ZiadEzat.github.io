// Declaring variables
var enemyPosY = [215, 215 - 80 , 220 - 165];
var enemyPosX = [-80, -160, -160, -320];
var speed;
var rand;
var score = 0;
var hearts = 3;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Randomizing enemies' positions
    shuffle(enemyPosY);
    shuffle(enemyPosX);
    this.y = enemyPosY[1];
    this.x = enemyPosX[1];
    // Randomizing enemy's speed
    rand = getRandomInt(1,4);
    if (rand == 1) {
        speed = 200;
    } else if (rand == 2) {
        speed = 300;
    } else if (rand == 3) {
        speed = 400;
    } else if (rand == 4) {
        speed = 600;
    }
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Applying enemy's speed
    this.x = this.x + this.speed * dt;
    // Loop enemies' through the canvas
    if (this.x  >= 500) {
        this.y = enemyPosY[1];
        this.x = enemyPosX[1];
        shuffle(enemyPosY);
        shuffle(enemyPosX);
    }
    // Player and enemy colliding resets the player
    // and decreases player's lives by one
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        hearts--;
        $('.lives').remove();
        $('p').remove();    
        $('body').append('<p>Score: ' + score + '</p>')    
        lives();
    // When the player is out of lives the game resets
    // and a pop up displaying player's score
    if (hearts == 0) {
        swal("Game Over","You've finished the game with score: " + score, "success");
        score = 0;
        hearts = 3;
        $('p').remove();
        $('.lives').remove;
        $('body').append('<p>Score: ' + score + '</p>')
        lives();
}
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {
    // Player can't go off screen
    if (this.x < 0) {
        this.x = 0;
    } if (this.x > 400) {
        this.x = 400;
    } if (this.y > 380) {
        this.y = 380;
    // When player reaches the water he gains score
    } if (this.y == -20) {
        this.x = 200;
        this.y = 380;
        score++;
        $('p').remove();
        $('.lives').remove();
        $('body').append('<p>score: ' + score + '</p>');
        lives();
    }
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    console.log(key);
 if (key == 'up') {
  player.y = player.y - 80;    
 }
     if (key == 'down') {
  player.y = player.y + 80;    
 }
     if (key == 'left') {
  player.x = player.x - 100;    
 }
     if (key == 'right') {
  player.x = player.x + 100;    
 }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var allEnemies = [enemy, enemy2, enemy3, enemy4, enemy5];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

    return array;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function lives() {
    // Display 3 hearts when layer got 3 lives
    //  and so on...
    if (hearts == 3) {
        $('body').append('<img class = "lives" src="images/Heart.png">');
        $('body').append('<img class = "lives" src="images/Heart.png">');
        $('body').append('<img class = "lives" src="images/Heart.png">');
        }
    if (hearts == 2) {
        $('body').append('<img class = "lives" src="images/Heart.png">');
        $('body').append('<img class = "lives" src="images/Heart.png">');
        }
        if (hearts == 1) {
        $('body').append('<img class = "lives" src="images/Heart.png">');
        }
}
