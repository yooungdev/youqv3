import { io } from "socket.io-client";

const getToken = () => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('token')
    }

    return ''
}

const socket = io(process.env.WS_URL ?? 'http://localhost:3333', {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${getToken()}`, 
        }
      }
    }
 });

export default socket