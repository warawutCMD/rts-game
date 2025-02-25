const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

class Building {
    constructor(type, x, y, isGhost = false) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.isGhost = isGhost; // กำหนดว่าคือแบบร่างจางๆ หรือไม่

        this.icon = new Image();
        switch (type) {
            case "Barracks":
                this.icon.src = "images/barracks.png";
                break;
            case "Stable":
                this.icon.src = "images/stable.png";
                break;
            case "Archery Range":
                this.icon.src = "images/archery-range.png";
                break;
        }
    }

    draw() {
        if (!this.icon.complete) return; // รอให้ไอคอนโหลดเสร็จ

        ctx.globalAlpha = this.isGhost ? 0.5 : 1.0; // โปร่งใส 50% ถ้าเป็นแบบร่าง
        ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1.0; // รีเซ็ตค่า opacity
    }
}

let buildings = [];
let ghostBuilding = null; // เก็บอาคารแบบร่าง

// ✅ เปิดโหมดวางอาคาร (สร้างแบบร่าง)
function startPlacingBuilding(type) {
    ghostBuilding = new Building(type, 0, 0, true);
}

// ✅ อัปเดตตำแหน่งแบบร่างตามเมาส์
canvas.addEventListener("mousemove", (event) => {
    if (!ghostBuilding) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ghostBuilding.x = x - ghostBuilding.width / 2; // จัดให้อยู่ตรงกลางเมาส์
    ghostBuilding.y = y - ghostBuilding.height / 2;

    drawGame();
});

// ✅ คลิกเพื่อวางอาคารจริง
canvas.addEventListener("click", (event) => {
    if (!ghostBuilding) return;

    // สร้างอาคารจริงโดยใช้ค่าจาก ghostBuilding
    buildings.push(new Building(ghostBuilding.type, ghostBuilding.x, ghostBuilding.y));
    ghostBuilding = null; // ลบแบบร่างออก
    drawGame();
});

// ✅ วาดเกมทั้งหมด
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    buildings.forEach(building => building.draw()); // วาดอาคารจริง
    if (ghostBuilding) ghostBuilding.draw(); // วาดแบบร่างจางๆ ถ้ามี
}

// ✅ ยกเลิกการวางอาคาร
function cancelBuildingPlacement() {
    ghostBuilding = null; // ลบแบบร่างออก
    drawGame(); // รีเฟรชหน้าจอ
}

// ✅ ฟังชั่นตรวจจับปุ่มกด (กด ESC เพื่อยกเลิก)
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cancelBuildingPlacement();
    }
});

drawGame();
