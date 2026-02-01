import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, sendMessage } from "../Services/operations/ConversatationApi";
import { useForm } from "react-hook-form";
import { IoSend, IoCallOutline, IoSettingsOutline, IoLockClosedOutline } from "react-icons/io5";

const MessageBox = () => {
    const dispatch = useDispatch();
    const { selectedChat, messages } = useSelector((state) => state.chat);
    const { token } = useSelector((state) => state.auth);
    const scrollRef = useRef(null);
    const { register, handleSubmit, reset } = useForm();

    // Auto-scroll logic
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (selectedChat?._id && token) {
            dispatch(getMessages(selectedChat._id, token));
        }
    }, [selectedChat?._id, token, dispatch]);

    const onSendMessage = (data) => {
        if (data.message.trim() === "") return;
        dispatch(sendMessage(selectedChat._id, data.message, token));
        reset();
    };

    const formatDividerDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
        
        return date.toLocaleDateString('en-GB', { 
            day: 'numeric', month: 'short', year: 'numeric' 
        });
    };

    if (!selectedChat) return null;

    return (
        <div className="flex flex-col h-full bg-[#05010a] relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600/5 blur-[120px] pointer-events-none"></div>

            {/* HEADER */}
            <div className="flex items-center justify-between p-4 sm:px-8 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl z-10">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full p-[1.5px] bg-gradient-to-tr from-purple-500 to-indigo-500">
                        <div className="h-full w-full rounded-full bg-[#05010a] overflow-hidden">
                            <img src={selectedChat.profile_pic} alt="profile" className="h-full w-full object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-tight mb-1">
                            {selectedChat.first_name} {selectedChat.last_name}
                        </h2>
                        <span className="text-[10px] text-purple-400 font-bold tracking-wider">@{selectedChat.user_name}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <IoCallOutline className="text-xl cursor-pointer hover:text-purple-400 transition-colors" />
                    <IoSettingsOutline className="text-xl cursor-pointer hover:text-purple-400 transition-colors" />
                </div>
            </div>

            {/* MESSAGES AREA */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 custom-scrollbar z-10">
                {messages && messages.length > 0 ? (
                    messages.map((msg, index) => {
                        // Safety Guard
                        if (!msg) return null;

                        // ALIGNMENT LOGIC
                        // If sender_id matches the person we are chatting with, it goes on the LEFT.
                        // If it doesn't match, it means WE sent it, so it goes on the RIGHT.
                        const isFromMe = msg.sender_id !== selectedChat._id;
                        
                        const currentDate = new Date(msg.createdAt).toDateString();
                        const prevDate = index > 0 ? new Date(messages[index - 1]?.createdAt).toDateString() : null;
                        const showDivider = currentDate !== prevDate;

                        return (
                            <div key={msg._id || index} className="flex flex-col gap-6">
                                {/* DATE DIVIDER */}
                                {showDivider && (
                                    <div className="flex items-center justify-center my-4 relative">
                                        <div className="absolute w-full h-[1px] bg-white/5"></div>
                                        <span className="relative px-5 py-1.5 rounded-full bg-[#05010a] border border-white/10 text-[9px] font-black uppercase tracking-[0.25em] text-gray-400 shadow-2xl">
                                            {formatDividerDate(msg.createdAt)}
                                        </span>
                                    </div>
                                )}

                                {/* BUBBLE WRAPPER */}
                                <div className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[75%] sm:max-w-[60%] px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-purple-500/5 ${
                                        isFromMe 
                                        ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-tr-none shadow-purple-900/20" 
                                        : "bg-white/[0.06] border border-white/10 text-gray-200 rounded-tl-none"
                                    }`}>
                                        <p className="text-sm font-medium leading-relaxed break-words">{msg.message}</p>
                                        <div className={`text-[9px] mt-1.5 font-bold uppercase tracking-tighter opacity-40 ${isFromMe ? "text-right" : "text-left"}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Only place the scroll anchor at the very last message */}
                                {index === messages.length - 1 && <div ref={scrollRef} />}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-20">
                        <IoLockClosedOutline className="text-3xl text-white mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white text-center">
                            End-to-End Encrypted
                        </p>
                    </div>
                )}
            </div>

            {/* INPUT AREA */}
            <div className="p-4 sm:p-6 bg-transparent z-10">
                <form 
                    onSubmit={handleSubmit(onSendMessage)} 
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-2 flex items-center focus-within:border-purple-500/30 transition-all duration-300 backdrop-blur-md"
                >
                    <input 
                        {...register("message")}
                        autoComplete="off"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-white placeholder:text-gray-700"
                    />
                    <button 
                        type="submit" 
                        className="h-10 w-10 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/20 transition-all active:scale-95"
                    >
                        <IoSend className="text-lg" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageBox;