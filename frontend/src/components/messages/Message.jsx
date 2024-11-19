import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {

	const { authUser } = useAuthContext(); // loggedin user 
	const { selectedConversation } = useConversation();//selected user
	const fromMe = message.senderId === authUser._id;// check if the senderid is equal to loggedin user id
	const chatClassName = fromMe ? "chat-end" : "chat-start"; //if fromMe=true than it will be chat-end design or eles chat-start design
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;// if fromMe=true than show loggedin user profile else show selected user profile
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";// if the msg is sent from loggedin user show blue bg in msg div
    const formattedTime = extractTime(message.createdAt);//returns hour:min format from createdAt using extractTime util
    const shakeClass = message.shouldShake ? "shake" : "";//for shake effect on msg div if shouldShake=true
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component'src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;