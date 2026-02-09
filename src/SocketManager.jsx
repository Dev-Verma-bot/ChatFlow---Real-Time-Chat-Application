import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setConnected, setOnlineUsers } from "../src/Slices/SocketSlice";
import { addMessage } from "../src/Slices/ChatSlice";
import notify from "../src/assets/notification.mp3"; 

const notificationSound = new Audio(notify);

const SocketManager = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const socketRef = useRef(null);

    useEffect(() => {
        // 1. Audio Interaction Unlock logic
        const unlockAudio = () => {
            notificationSound.play().then(() => {
                notificationSound.pause();
                notificationSound.currentTime = 0;
            }).catch(() => {});
            window.removeEventListener('click', unlockAudio);
        };
        window.addEventListener('click', unlockAudio);

        // 2. CONNECTION & LOGOUT LOGIC
        if (user) {
            // Only create a socket if one doesn't exist already
            if (!socketRef.current) {
                const socket = io(process.env.REACT_APP_BASE_URL, {
                    query: { 
                        userId: String(user._id || user.id) 
                    },
                    transports: ['websocket'], // Force websocket for instant status updates
                    reconnection: true
                });

                socketRef.current = socket;

                socket.on("connect", () => {
                    console.log("Socket Connected");
                    dispatch(setConnected(true));
                });
                
                socket.on("getOnlineUsers", (users) => {
                    console.log("Syncing Online Users:", users);
                    dispatch(setOnlineUsers(users));
                });

                socket.on("disconnect", (reason) => {
                    console.log("Socket Disconnected:", reason);
                    dispatch(setConnected(false));
                });

                socket.on("newMessage", (new_message) => {
                    const currentUserId = String(user._id || user.id);
                    // Play sound only if I am the receiver
                    if (String(new_message.sender_id) !== currentUserId) {
                        notificationSound.currentTime = 0;
                        notificationSound.play().catch((e) => console.log("Sound error:", e));
                    }
                    dispatch(addMessage(new_message));
                });
            }
        } else {
            // 3. EXPLICIT LOGOUT CLEANUP
            // This runs immediately when user becomes null (Logout)
            if (socketRef.current) {
                console.log("User logged out: Killing socket connection...");
                socketRef.current.disconnect(); 
                socketRef.current = null;
            }
            // Clear lists immediately in Redux
            dispatch(setConnected(false));
            dispatch(setOnlineUsers([]));
        }

        // 4. COMPONENT UNMOUNT CLEANUP
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            window.removeEventListener('click', unlockAudio);
        };
    }, [user, dispatch]);

    return null;
};

export default SocketManager;