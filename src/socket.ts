import { io } from "socket.io-client";

const socket = io(process.env.WS_URL ?? 'http://localhost:3333');

export default socket