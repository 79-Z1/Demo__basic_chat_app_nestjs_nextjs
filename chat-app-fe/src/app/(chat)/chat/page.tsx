'use client';
import { getSocket } from '@/helpers/socket';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
let socket: Socket;

const Chat = () => {
	useEffect(() => {
		try {
			const accessToken = localStorage.getItem('Authorization') ?? '';
			socket = getSocket(accessToken);
		} catch (error) {
			console.log('🚀🚀🚀 -> useEffect -> error:::', error);
		}
		return () => {
			socket.off();
		}
	}, []);


	return (
		<div className="flex flex-col flex-auto items-center flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
			<h1>Click on user avatar to chat</h1>
		</div>
	);
};

export default Chat;
