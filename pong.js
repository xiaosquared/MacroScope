/*
***PONG!***
*/
//global vars and controls here
var paddle = xForm.makeBox(0, 0, 5, 1, 0.7);
var leftBound = 0;
var rightBound = xForm.xWidth;
var paddleSpeed = 0.2;
paddle.draw();

var playerPaddle = xForm.makeBox(10, 23, 5, 1, 0.7);
var playerPaddleSpeed = 0.2;
playerPaddle.draw();

var bullet = xForm.makeBox(12, 15, 5, 5, 0.4);
bullet.makeHollow();
var bulletXSpeed = 0.08;
var bulletYSpeed = -0.1;

window.addEventListener('keydown', function(e) {
  switch(e.keyCode) {
    case 100:
    case 37:
    	playerPaddleSpeed = -0.2;
    break;
    case 102:
    case 39:
        playerPaddleSpeed = 0.2;
    break;
  }
});

//this function will be executed with each frame
return function () {
  //simple AI for computer
  if (paddle.x <= bullet.x) {
    paddleSpeed = Math.random() * 0.1 + 0.08;
  }
  else if (paddle.x + paddle.xWidth >= bullet.x + bullet.xWidth) {
    paddleSpeed = Math.random() * -0.1 - 0.08;
  }
  else {
    paddleSpeed = 0;
  }
  //keep player paddle in bounds
  if (playerPaddle.x > rightBound - playerPaddle.xWidth) {
    playerPaddleSpeed = 0;
    playerPaddle.x = rightBound - playerPaddle.xWidth;
  }
  if (playerPaddle.x < leftBound) {
    playerPaddleSpeed = 0;
    playerPaddle.x = leftBound
  }
  //bounce bullet
  if (bullet.x > rightBound-bullet.xWidth || bullet.x < leftBound) {
    bulletXSpeed = -bulletXSpeed;
  }
  if (bullet.y > xForm.yWidth - bullet.yWidth || bullet.y < 1) {
    bullet.destroy();
    bullet.x = 12.5;
  }
  //bullet collision
  if (((bullet.y - 1 <= paddle.y + paddle.yWidth) && (bullet.x >= paddle.x && bullet.x <= paddle.x + paddle.xWidth) && bulletYSpeed < 0) || ((bullet.y + bullet.yWidth >= playerPaddle.y) && (bullet.x >= playerPaddle.x && bullet.x <= playerPaddle.x + paddle.xWidth) && bulletYSpeed > 0)) {
    bulletYSpeed = -bulletYSpeed;
    if (Math.abs(bulletYSpeed < 0.2)) {
      if (bulletYSpeed < 0) {
        bulletYSpeed -= 0.005;
      }
      else bulletYSpeed += 0.005;
    }
    if (bulletXSpeed > 0) {
      bulletXSpeed = Math.random(0) * 0.2;
    }
    else {
      bulletXSpeed = Math.random(0) * -0.2;
    }
  }
  //update paddle, playerPaddle and bullet with each frame
  paddle.move(paddleSpeed,0);
  playerPaddle.move(playerPaddleSpeed, 0)
  bullet.move(bulletXSpeed, bulletYSpeed);
};
