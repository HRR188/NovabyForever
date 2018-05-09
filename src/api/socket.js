import API_BASE from './root'

let portList = {
    message:9501
};

export default function ({port,onOpen,onMessage,onClose}) {
    let socket = new WebSocket(process.env.WEBSOCKET+ API_BASE + ':' + portList[port]);
    socket.onopen = onOpen;
    socket.onmessage = onMessage;
    socket.onclose = onClose;
    return socket
}