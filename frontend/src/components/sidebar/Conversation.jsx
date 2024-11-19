import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({conversation,lastIdx,emoji}) => {
	const{selectedConversation,setSelectedConversation}=useConversation();

	const isSelected= selectedConversation?._id === conversation._id; // takes a boolen value .checks if we have clicked on the user or not
    const { onlineUsers } = useSocketContext();//onlineUsers is an array of all the users who are online
	const isOnline = onlineUsers.includes(conversation._id);//This is a JavaScript method that checks if a given value (in this case, conversation._id) is present in the array onlineUsers.

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				 ${isSelected ? "bg-sky-500" : ""}`	 // if isSelected is true than it will highlight the div(user bar) to blue
			}
			onClick={()=>setSelectedConversation(conversation)}// sets the selectedConversation = clicked conversation(user)
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.username}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;
