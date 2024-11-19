import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading }=useGetMessages();
    useListenMessages();
	const lastMessageRef = useRef();//used to manipulate the DOM elements

	useEffect(() => {
		requestAnimationFrame(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });//lastMessageRef.current will point to the DOM element representing the last message in the chat.
		});//setTimeout=Ensures the DOM has finished rendering the new messages before scrolling. Without the timeout, the scroll might occur before the latest message is mounted.
	}, [messages]);//when there is a new messsage in conversation scrolldown on its own (scrollIntoView)

	return (
		<div className='px-4 flex-1 overflow-auto'>
            {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					
					<div key={message._id} ref={lastMessageRef}>
					<Message message={message} />
				    </div>
					
				))}
			
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;
//{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}= to show the design 3 times when it is loading 

// {!loading && messages.length === 0 && (
// 	<p className='text-center'>Send a message to start the conversation</p>
// )} = if they have started to message for the first time with the selected user 

// {!loading &&
// 	messages.length > 0 &&
// 	messages.map((message) => (
// 		<div key={message._id} ref={lastMessageRef}>
// 			<Message message={message} />
// 		</div>
// 	))} = if there is a conversation then get the messages(senderId,resevierId,message itself) and send it as argument <Message message={message} />