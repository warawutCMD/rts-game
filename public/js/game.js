const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

class Unit {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.size = 20; // ขนาดยูนิต
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

let units = [];

function createUnit() {
    const x = Math.random() * (canvas.width - 20);
    const y = Math.random() * (canvas.height - 20);
    const newUnit = new Unit("Soldier", x, y);
    units.push(newUnit);
    drawGame();
}

function selectUnit(unitName) {
    fetch(`/select-unit?name=${unitName}`)
      .then(res => res.json())
      .then(data => console.log(data.message));
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    units.forEach(unit => unit.draw());
}

drawGame();
