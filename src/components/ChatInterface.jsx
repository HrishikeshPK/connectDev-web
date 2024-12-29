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
            // Join the room
            socket.emit('joinRoom', user._id);

            // Fetch chat history
            const fetchMessages = async () => {
                try {
                    const res = await axios.get(`${BASE_URL}/chat/${user._id}`, { withCredentials: true });
                    setMessages(res.data);
                } catch (err) {
                    console.log(err);
                }
            };

            fetchMessages();

            // Listen for incoming messages
            socket.on('receiveMessage', (message) => {
                setMessages((prev) => [...prev, message]);
            });

            return () => {
                socket.off('receiveMessage');
            };
        }
    }, [user]);

    // Auto-scroll to the bottom when messages update
    useEffect(() => {
        const chatHistory = document.querySelector('.chat-history');
        if (chatHistory) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            senderId: loggedInUser._id, // Replace with actual user ID
            recipientId: user._id,
            text: newMessage,
        };

        // Emit the message to the server
        socket.emit('sendMessage', messageData);

        // Add the message to the local state
        setMessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
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
