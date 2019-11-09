var canvas = document.querySelector("canvas");
var parent = document.querySelector("body");

//canvas.style.width ='100%';
//canvas.style.height='100%';
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;
var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 80;
var minRadius = 2;

//var colorArray=['#0E090F','#161424', '#334970', '#6BAAC5','#FFFFFF' ];
var colorArray = ["#FCFFF5", "#D1DBBD", "#91AA9D", "#3E606F", "#193441"];

//var colorArray=['#121C25','#13314D', '#184169', '#2D587B','#BE4248' ];
//var colorArray=['#013859','#185E65', '#F9CC7F', '#F15C25','#9E1617' ];
//var colorArray=['#031727','#126872', '#0B877D', '#18C29C','#88F9D4' ];

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (
            50 > mouse.x - this.x &&
            -50 < mouse.x - this.x &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50 &&
            this.radius < 100
        ) {
            this.radius += 1;
        } else if (this.radius > 5) {
            this.radius -= 1;
        }
        this.draw();
    };
} //end function circle()

var circleArray = [];

for (var i = 0; i < 400; i++) {
    var speed = 1;
    var radius = Math.random() * 5 + 0.5; //circle radius size
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * speed; //how fast x changes. 1px per second here
    var dy = (Math.random() - 0.5) * speed;

    circleArray.push(new Circle(x, y, dx, dy, radius));
}

for (var j = 0; j < circleArray.length; j++) {
    circleArray[j].draw();
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
