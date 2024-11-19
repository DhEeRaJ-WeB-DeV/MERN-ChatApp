import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();// calls the function only when there is a selected conversation

	}, [selectedConversation?._id, setMessages]);//re-render the page when there is a selected user 
    //(React re-runs the useEffect whenever selectedConversation._id changes.)
    //setMessage for when we get the messages from server.ncluding it in the dependency array ensures the effect always uses the latest setMessages function reference.
    // basically it will re-render the page with respect to selected conversation with the previous messages they have and if there are sending a new message
	return { messages, loading };
};
export default useGetMessages;