import { createContext, useState, useEffect, useContext} from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);//if there is a connection or not
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if(authUser){
            const socket=io("https://mern-chatapp-gshr.onrender.com",{// establishes a WebSocket connection to the server at localhost:1080 using socket.io.
				query: {
					userId: authUser._id,
				},
			});
            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});//got the online users from server and set it to state bcos of io.emit("getOnlineUsers", Object.keys(userSocketMap)); in socket.js file

            return()=>socket.close();
        }else{
            if(socket){ // If user is not authenticated, ensure the socket is closed if it exists
                socket.close();
                setSocket(null);
            }
            
        }
	},[authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
