import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

export const initiateSocketConnection = ({ token }) => {
  const socket = io(BASE_URL, {
    path: "/socket.io",
    transports: ["websocket"],
    auth: { token },
    query: { token },
    reconnectionAttempts: 5,
  });

  return socket;
}