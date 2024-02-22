//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x: 10,
    y: boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = -1;
let ballVelocityY = -1;

let ball = {
    x: boardWidth/2,
    y: boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}

let player1Score = 0;
let player2Score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw player1
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    
    //player1
        context.fillStyle = "skyblue";
        let nextPlayer1Y = player1.y + player1.velocityY;
        if (!outOfBounds(nextPlayer1Y)) {
            player1.y = nextPlayer1Y;
        }
        // player1.y += player1.velocityY;
        context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //player2
        let nextPlayer2Y = player2.y + player2.velocityY;
        if (!outOfBounds(nextPlayer2Y)) {
            player2.y = nextPlayer2Y;
        }
        // player2.y += player2.velocityY;
        context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //ball
        context.fillStyle = "white";
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        // let nextBallX = ball.x + ball.velocityX;
        // let nextBallY = ball.y + ball.velocityY;
        // // Check for collision with left and right walls
        // if (nextBallX < 0 || nextBallX + ballWidth > boardWidth) {
        //     ball.velocityX *= -1; // Reverse the horizontal velocity
        // }
        // // Check for collision with top and bottom walls
        // if (nextBallY < 0 || nextBallY + ballHeight > boardHeight) {
        //     ball.velocityY *= -1; // Reverse the vertical velocity
        // }
        // ball.x = nextBallX;
        // ball.y = nextBallY;
        context.fillRect(ball.x, ball.y, ball.width, ball.height);

        if (ball.y < 0 || ball.y + ball.height > boardHeight) {
            ball.velocityY *= -1; // Reverse the vertical velocity
        }

        if (detectCollision(ball, player1)) {
            if(ball.x <= player1.x + player1.width) {
                ball.velocityX *= -1;
            }
        }
        else if (detectCollision(ball, player2)) {
            if(ball.x <= player2.x + player2.width) {
                ball.velocityX *= -1;
            }
        }

        //game over
        if (ball.x < 0) {
            player2Score ++;
            resetGame(1);
        } else if (ball.x + ball.width > boardWidth) {
            player1Score ++;
            resetGame(2);
        }

        //score
        context.font = "45px sans-serif";
        context.fillText(player1Score, boardWidth/5, 45);
        context.fillText(player2Score, boardWidth*4/5 - 45, 45);

        //dotted line
        for (let i = 10; i < boardHeight; i+=25) {
            context.fillRect(boardWidth/2 - 10, i, 5, 5);
        }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    //player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    } else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    //player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    } else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

//check if the object's x,y coordinate right when collide
function detectCollision(object1, object2) {
    return  object1.x < object2.x + object2.width &&
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.y + object1.height > object2.y;
}

//reset game
function resetGame(direction) {
    ball = {
        x: boardWidth/2,
        y: boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: ballVelocityY
    }
}