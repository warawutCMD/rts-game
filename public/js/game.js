const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

class Unit {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.size = 20;
        this.selected = false;
    }

    draw() {
        ctx.fillStyle = this.selected ? "red" : "blue";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    moveTo(x, y) {
        this.x = x - this.size / 2;
        this.y = y - this.size / 2;
    }
}

let units = [];
let selectionBox = { x: 0, y: 0, width: 0, height: 0, active: false };
let isShiftPressed = false;

// 📌 Event Key Down (กด Shift)
document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") isShiftPressed = true;
});

// 📌 Event Key Up (ปล่อย Shift)
document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") isShiftPressed = false;
});

// 📌 ฟังก์ชันสร้างยูนิต
function createUnit() {
    const x = Math.random() * (canvas.width - 20);
    const y = Math.random() * (canvas.height - 20);
    const newUnit = new Unit("Soldier", x, y);
    units.push(newUnit);
    drawGame();
}

// 📌 Event Mouse Down (เริ่มลาก)
canvas.addEventListener("mousedown", (event) => {
    if (event.button === 2) return; // ถ้าคลิกขวา ไม่ต้องลาก Selection Box

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

// 📌 ฟังก์ชันเลือกยูนิต
function selectUnits() {
    units.forEach((unit) => {
        const insideSelection =
            unit.x + unit.size > selectionBox.x &&
            unit.x < selectionBox.x + selectionBox.width &&
            unit.y + unit.size > selectionBox.y &&
            unit.y < selectionBox.y + selectionBox.height;

        if (insideSelection) {
            if (isShiftPressed) {
                unit.selected = true; // ถ้ากด Shift -> เลือกเพิ่ม
            } else {
                unit.selected = true; // เลือกใหม่ทั้งหมด
            }
        } else if (!isShiftPressed) {
            unit.selected = false; // ถ้าไม่กด Shift -> ยกเลิกการเลือกตัวอื่น
        }
    });
}

// 📌 Event Mouse Right Click (คลิกขวาเพื่อเคลื่อนที่)
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // ป้องกันเมนูคลิกขวา
    const targetX = event.clientX - canvas.offsetLeft;
    const targetY = event.clientY - canvas.offsetTop;

    // เคลื่อนที่เฉพาะยูนิตที่ถูกเลือก
    units.forEach((unit) => {
        if (unit.selected) {
            unit.moveTo(targetX, targetY);
        }
    });

    drawGame();
});

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

// ป้องกันเมนูคลิกขวาบน Canvas
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

drawGame();
