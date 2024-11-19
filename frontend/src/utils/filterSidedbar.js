import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation"; // Custom hook for managing conversations
import useGetConversations from "../hooks/useGetConversations"; // Custom hook to fetch conversations

const SidebarSearch = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const [filteredConversations, setFilteredConversations] = useState([]);

    // Filter conversations dynamically as the user types
    useEffect(() => {
        if (search.length === 0) {
            setFilteredConversations(conversations); // Show all conversations if search is empty
        } else if (search.length < 3) {
            setFilteredConversations([]); // Don't show results for short queries
        } else {
            const results = conversations.filter((c) =>
                c.username.toLowerCase().includes(search.toLowerCase())//filter the users in sided bar as we search
            );//eg: if user search for "a" it will show all users whose name starts with "a"
            setFilteredConversations(results);//sets the filteredConversations with the array of username that start with letter 'a'
        }
    }, [search, conversations]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }

        if (filteredConversations.length === 0) {
            toast.error("No such user found!");// if the filteredConversations[0] is empty it will show this message
        }//if there are users left on the sidebar 
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Search Bar */}
            <form
                onSubmit={handleSubmit}
                style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
            >
                <input
                    type="text"
                    placeholder="Search for a user..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "14px",
                    }}
                />
            </form>

            {/* Sidebar showing filtered conversations */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    backgroundColor: "#f4f4f4",
                    padding: "10px",
                }}
            >
                {filteredConversations.length > 0 ? ( //if there are users left on the sidebar
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {filteredConversations.map((conversation) => (
                            <li
                                key={conversation.id}
                                style={{
                                    padding: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedConversation(conversation)}// onclick of the user it will select the conversation bw the user and the logged in user
                            >
                                {conversation.username}
                            </li>//  {conversation.username}=shows the username
                        ))}
                    </ul>
                ) : (
                    <p style={{ textAlign: "center", color: "#999" }}>
                        {search.length < 3    //if there are no users left on the sidebar or less than 3 characters in the search bar
                            ? "Type at least 3 characters to search"
                            : "No users found!"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SidebarSearch;
