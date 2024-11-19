import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {//the  useffect is configured to run only once when the component mounts
		const getConversations = async () => { // when we enter /home this useEffect will be called to re-render the page
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations(); 
	}, []);

	return { loading, conversations };//gets all users from the database for sidebar
};
export default useGetConversations;