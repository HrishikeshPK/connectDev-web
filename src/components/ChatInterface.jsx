import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useSelector } from 'react-redux';

const socket = io(BASE_URL, { withCredentials: true });

const ChatInterface = ({ user, onClose }) => {
    const loggedInUser = useSelector((store) => store.user);
    console.log(loggedInUser);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (user) {
            
            socket.emit('joinRoom', user._id);   // join the chatroom

            
            const fetchMessages = async () => {
                try {
                    const res = await axios.get(`${BASE_URL}/chat/${user._id}`, { withCredentials: true });  // fetching chat history
                    setMessages(res.data);
                } catch (err) {
                    console.log(err);
                }
            };

            fetchMessages();

           
            socket.on('receiveMessage', (message) => {                  // listen for incoming messages
                setMessages((prev) => [...prev, message]);
            });

            return () => {
                socket.off('receiveMessage');
            };
        }
    }, [user]);

   
    useEffect(() => {                                                        // autoscroll to the bottom when messages update
        const chatHistory = document.querySelector('.chat-history');
        if (chatHistory) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            senderId: loggedInUser._id, 
            recipientId: user._id,
            text: newMessage,
        };

        
        socket.emit('sendMessage', messageData);        // emit the message to the server

      
        setMessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);       // add the message to state
        setNewMessage('');
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-slate-400 rounded-lg p-4 w-1/2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-slate-600 font-bold">Chat with {user.firstName}</h2>
                    <button className="btn btn-error" onClick={onClose}>
                        Close
                    </button>
                </div>
                <div className="chat-history overflow-y-scroll h-64 my-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex my-1 ${
                                msg.senderId === loggedInUser._id ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <p
                                className={`p-2 rounded ${
                                    msg.senderId === loggedInUser._id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-black'
                                }`}
                            >
                                {msg.text}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        className="input input-bordered flex-grow mr-2"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
