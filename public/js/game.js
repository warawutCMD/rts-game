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
        this.selected = false; // กำหนดสถานะการเลือก
    }

    draw() {
        ctx.fillStyle = this.selected ? "red" : "blue"; // ถ้าเลือก -> สีแดง
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

let units = [];
let selectionBox = { x: 0, y: 0, width: 0, height: 0, active: false };

// 📌 ฟังก์ชันสร้างยูนิตแบบสุ่ม
function createUnit() {
    const x = Math.random() * (canvas.width - 20);
    const y = Math.random() * (canvas.height - 20);
    const newUnit = new Unit("Soldier", x, y);
    units.push(newUnit);
    drawGame();
}

// 📌 Event Mouse Down (เริ่มลาก)
canvas.addEventListener("mousedown", (event) => {
    selectionBox.x = event.clientX - canvas.offsetLeft;
    selectionBox.y = event.clientY - canvas.offsetTop;
    selectionBox.width = 0;
    selectionBox.height = 0;
    selectionBox.active = true;
});

// 📌 Event Mouse Move (ลากเมาส์)
canvas.addEventListener("mousemove", (event) => {
    if (!selectionBox.active) return;
    selectionBox.width = event.clientX - canvas.offsetLeft - selectionBox.x;
    selectionBox.height = event.clientY - canvas.offsetTop - selectionBox.y;
    drawGame();
});

// 📌 Event Mouse Up (ปล่อยเมาส์ -> เลือกยูนิต)
canvas.addEventListener("mouseup", () => {
    selectionBox.active = false;
    selectUnits();
    drawGame();
});

// 📌 ฟังก์ชันตรวจจับยูนิตที่อยู่ใน Selection Box
function selectUnits() {
    units.forEach((unit) => {
        if (
            unit.x + unit.size > selectionBox.x &&
            unit.x < selectionBox.x + selectionBox.width &&
            unit.y + unit.size > selectionBox.y &&
            unit.y < selectionBox.y + selectionBox.height
        ) {
            unit.selected = true;
        } else {
            unit.selected = false;
        }
    });
}

// 📌 ฟังก์ชันวาดเกม
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // วาดยูนิต
    units.forEach(unit => unit.draw());

    // วาด Selection Box
    if (selectionBox.active) {
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        ctx.strokeRect(
            selectionBox.x,
            selectionBox.y,
            selectionBox.width,
            selectionBox.height
        );
    }
}

// เรียกครั้งแรกให้วาดเกม
drawGame();
