import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function selectUnit(unitName: string) {
  socket.emit("selectUnit", unitName);
}

socket.on("unitSelected", (data) => {
  console.log(`Unit Selected: ${data.name}`);
});

socket.on("connect", () => {
  console.log("connected to server");
});
