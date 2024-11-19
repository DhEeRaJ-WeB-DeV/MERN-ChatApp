import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {//if there is a new message, add it to the messages array. due to io.to(receiverSocketId).emit("newMessage", newMessage);
			newMessage.shouldShake=true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);//set the messages array to the current messages array plus the new message
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);//on the socket connection , listen for new messages and add them to the messages array. When the component unmounts,
};
export default useListenMessages;