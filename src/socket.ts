import { io } from "socket.io-client";

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const { WS_URL } = publicRuntimeConfig;



const getToken = () => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('token')
    }

    return ''
}

const socket = io(WS_URL ?? 'http://localhost:3333', {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${getToken()}`, 
        }
      }
    }
 });

export default socket