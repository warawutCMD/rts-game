import { Server } from "socket.io";
import { UnitManager } from "../logic/UnitManager";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

const unitManager = new UnitManager();

const unit1 = unitManager.createUnit("Warrior", 100, 15, 5);
const unit2 = unitManager.createUnit("Archer", 80, 10, 7);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("selectUnit", (unitName) => {
    const unit = [unit1, unit2].find((u) => u.name === unitName);
    if (unit) {
      unitManager.selectUnit(unit);
      io.emit("unitSelected", { name: unit.name });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

console.log("WebSocket server running on http://localhost:3000");
