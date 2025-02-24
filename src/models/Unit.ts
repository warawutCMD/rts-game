export class Unit {
  name: string;
  health: number;
  attack: number;
  speed: number;
  position: { x: number; y: number };

  constructor(
    name: string,
    health: number,
    attack: number,
    speed: number,
    x: number,
    y: number
  ) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.speed = speed;
    this.position = { x, y };
  }

  attackUnit(target: Unit) {
    if (target instanceof Unit) {
      // ตรวจสอบว่า target เป็นหน่วย (Unit) หรือไม่
      target.health -= this.attack;
      console.log(
        `${this.name} attacks ${target.name}. ${target.name}'s health is now ${target.health}`
      );
    } else {
      console.error("Target is not a valid Unit.");
    }
  }

  moveTo(x: number, y: number) {
    this.position = { x, y };
    console.log(`${this.name} moves to position (${x}, ${y})`);
  }
}
