import { Socket, io } from 'socket.io-client';

let socket: Socket;

export const initSocket = (accessToken: string) => {
	socket = io('http://localhost:3006', {
		extraHeaders: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	socket.on('connect', () => {
		console.log(socket.id, 'connected');
	});

	socket.on('connect_error', (err) => {
		console.log(`connect error due to ${err.message}`);
	});
	return socket;
};

export const getSocket = (accessToken: string) => {
    if(!socket) {
        initSocket(accessToken)
    }
	return socket;
};
