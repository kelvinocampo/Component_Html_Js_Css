const canvas = document.querySelector('canvas');
canvas.width = innerWidth / 1.1;
canvas.height = innerHeight / 1.1;

const ctx = canvas.getContext('2d');
const balls = [];

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radio = 7;
        this.dirX = (Math.random() * 2) - 1;
        this.dirY = (Math.random() * 2) - 1;
        this.speed = 5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;

        if (this.x + this.radio > canvas.width || this.x - this.radio < 0) { this.dirX *= -1; }
        if (this.y + this.radio > canvas.height || this.y - this.radio < 0) { this.dirY *= -1; }
    }
}

for (let i = 0; i < 25; i++) {
    let x = Math.random() * (canvas.width - 20) + 10;
    let y = Math.random() * (canvas.height - 20) + 10;
    let ball = new Ball(x, y);
    balls.push(ball);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        balls.forEach(ball2 => {
            const distance = Math.sqrt((ball.x - ball2.x) ** 2 + (ball.y - ball2.y) ** 2);
            if (distance <= 200 && ball !== ball2) {
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineTo(ball2.x, ball2.y);
                ctx.stroke();
                ctx.closePath();
            }
        });

        ball.draw();
        ball.move();
    });
    requestAnimationFrame(animate);
}

animate();
