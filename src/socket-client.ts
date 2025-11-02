import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");
  const socket = manager.socket("/");
  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  const serverStatusLaberl = document.querySelector("#server-status")!;
  const clientsUl = document.querySelector("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form");
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input");

  socket.on("connect", () => {
    serverStatusLaberl.innerHTML = "connected";
  });

  socket.on("disconnect", () => {
    serverStatusLaberl.innerHTML = "disconnected";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientsHtml = "";
    clients.forEach((client) => {
      clientsHtml += `<li>${client}</li>`;
    });
    clientsUl.innerHTML = clientsHtml;
  });

  messageForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput?.value.trim().length <= 0) return;
    socket.emit("message-from-client", {
      id: "YO!!!",
      message: messageInput?.value,
    });
    messageInput.value = "";
  });
};
