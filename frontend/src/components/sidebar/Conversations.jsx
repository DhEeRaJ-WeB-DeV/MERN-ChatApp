import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const{loading,conversations}=useGetConversations();
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, index) => (// took value and index from conversations 
				
				<Conversation                             // passed the arguments to import Conversation from "./Conversation";
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={index === conversations.length - 1}
					
				/>
				
			))}
			{loading ? <span className="loading loading-spinner mx-auto"></span>: null}
		</div>
	);
};
export default Conversations;