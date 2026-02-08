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
        // 1. Audio Interaction Unlock
        const unlockAudio = () => {
            notificationSound.play().then(() => {
                notificationSound.pause();
                notificationSound.currentTime = 0;
            }).catch(() => {});
            window.removeEventListener('click', unlockAudio);
        };
        window.addEventListener('click', unlockAudio);

        // 2. CONNECTION LOGIC (Only if user exists)
        if (user) {
            const socket = io(process.env.REACT_APP_BASE_URL, {
                query: { 
                    userId: String(user._id || user.id) 
                }
            });
            socketRef.current = socket;

            socket.on("connect", () => dispatch(setConnected(true)));
            
            socket.on("getOnlineUsers", (users) => {
                console.log("Online users list received:", users);
                dispatch(setOnlineUsers(users));
            });

            socket.on("disconnect", () => {
                dispatch(setConnected(false));
            });

            socket.on("newMessage", (new_message) => {
                const currentUserId = String(user._id || user.id);
                if (String(new_message.sender_id) !== currentUserId) {
                    notificationSound.currentTime = 0;
                    notificationSound.play().catch(() => {});
                }
                dispatch(addMessage(new_message));
            });
        }

        // 3. THE FIX: Cleanup is OUTSIDE the 'if(user)' block
        // This runs every time 'user' changes, ensuring that if user becomes null,
        // the previous socket connection is closed.
        return () => {
            if (socketRef.current) {
                console.log("Cleaning up: Disconnecting socket...");
                socketRef.current.disconnect(); 
                socketRef.current = null;
            }
            // Reset state so UI cleans up immediately
            dispatch(setConnected(false));
            dispatch(setOnlineUsers([]));
            window.removeEventListener('click', unlockAudio);
        };
    }, [user, dispatch]);

    return null;
};

export default SocketManager;