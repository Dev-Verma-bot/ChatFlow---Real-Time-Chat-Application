import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setConnected, setOnlineUsers } from "../src/Slices/SocketSlice";
import { addMessage } from "../src/Slices/ChatSlice";
import notify from "../src/assets/notification.mp3"; 

// Create a single audio instance outside the component to avoid memory leaks
const notificationSound = new Audio(notify);

const SocketManager = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const socketRef = useRef(null);

    useEffect(() => {
        // 1. "Unlock" audio on the first user interaction
        // This solves the "Playback blocked" issue
        const unlockAudio = () => {
            notificationSound.play().then(() => {
                notificationSound.pause();
                notificationSound.currentTime = 0;
            }).catch(() => {});
            window.removeEventListener('click', unlockAudio);
        };
        window.addEventListener('click', unlockAudio);

        if (user) {
            // 2. Use user._id (common in MongoDB) or fallback to user.id
            const socket = io(process.env.REACT_APP_BASE_URL, {
                query: { 
                    userId: String(user._id || user.id) 
                }
            });
            socketRef.current = socket;

            socket.on("connect", () => dispatch(setConnected(true)));
            socket.on("getOnlineUsers", (users) => dispatch(setOnlineUsers(users)));
            socket.on("disconnect", () => dispatch(setConnected(false)));

            socket.on("newMessage", (new_message) => {
                // 3. Play sound ONLY if the message is from someone else
                const currentUserId = String(user._id || user.id);
                if (String(new_message.sender_id) !== currentUserId) {
                    notificationSound.currentTime = 0; // Reset sound to start
                    notificationSound.play().catch(e => console.log("Audio play blocked: user must click page first."));
                }

                console.log("new message ->", new_message);
                dispatch(addMessage(new_message));
            });

            return () => {
                socket.close();
                socketRef.current = null;
                window.removeEventListener('click', unlockAudio);
            };
        }
    }, [user, dispatch]);

    return null;
};

export default SocketManager;