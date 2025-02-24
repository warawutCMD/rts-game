import { Unit } from "../models/Unit";

export class UnitManager {
  private units: Unit[] = [];
  private selectedUnits: Unit[] = [];
  private selectedUnit: Unit | null = null;

  createUnit(
    name: string,
    health: number,
    attack: number,
    speed: number,
    x: number = 0,
    y: number = 0
  ) {
    const newUnit = new Unit(name, health, attack, speed, x, y); // กำหนดตำแหน่งเริ่มต้น
    this.units.push(newUnit); // เพิ่มหน่วยใหม่เข้าไปในอาเรย์
    return newUnit;
  }

  // ฟังก์ชันเลือกหน่วย
  //   selectUnit(unit: Unit) {
  //     if (!this.selectedUnits.includes(unit)) {
  //       this.selectedUnits.push(unit);
  //     }
  //   }

  selectUnit(unit: Unit) {
    if (this.units.includes(unit)) {
      this.selectedUnit = unit;
      console.log(`Selected unit: ${unit.name}`);
    } else {
      console.log("Unit not found!");
    }
  }

  getSelectedUnit() {
    return this.selectedUnit;
  }

  // ฟังก์ชันยกเลิกการเลือกหน่วย
  deselectUnit(unit: Unit) {
    const index = this.selectedUnits.indexOf(unit);
    if (index !== -1) {
      this.selectedUnits.splice(index, 1);
    }
  }

  // ฟังก์ชันเลือกกลุ่มหน่วย
  selectGroup(units: Unit[]) {
    this.selectedUnits = units;
  }

  // ฟังก์ชันให้หน่วยเคลื่อนที่ไปยังตำแหน่งที่ต้องการ
  moveUnit(unit: Unit, destination: { x: number; y: number }) {
    // ตรวจสอบการเคลื่อนที่ที่ไม่ชนกับสิ่งกีดขวางหรือขอบเขต
    if (this.isValidMove(unit, destination)) {
      unit.position = destination; // เปลี่ยนตำแหน่งหน่วย
    }
  }

  // ฟังก์ชันตรวจสอบตำแหน่งที่สามารถเคลื่อนที่ได้
  isValidMove(unit: Unit, destination: { x: number; y: number }): boolean {
    // ตรวจสอบว่าตำแหน่งที่ปลอดภัยหรือไม่
    return true; // ฟังก์ชันตรวจสอบที่คุณสามารถพัฒนาต่อไปได้
  }

  attackUnit(attacker: Unit, target: Unit) {
    // ตรวจสอบการเรียกใช้ attackUnit อย่างถูกต้อง
    if (attacker instanceof Unit && target instanceof Unit) {
      attacker.attackUnit(target);
    } else {
      console.error("Invalid attacker or target.");
    }
  }
}
