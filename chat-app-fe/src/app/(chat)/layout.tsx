'use client';
import ChatUserActive from '@/components/ChatUserActive';
import { getSocket } from '@/helpers/socket';
import React, { useEffect } from 'react';

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		const accessToken = localStorage.getItem('Authorization') ?? '';
		const socket = getSocket(accessToken);

		return () => {
			socket.off();
		}
	})
	return (
		<div className="flex h-screen antialiased text-gray-800">
			<div className="flex flex-row h-full w-full overflow-x-hidden">
				<ChatUserActive />
				<div className="flex flex-col flex-auto h-full p-6">
					{children}
				</div>
			</div>
		</div>
	);
}
