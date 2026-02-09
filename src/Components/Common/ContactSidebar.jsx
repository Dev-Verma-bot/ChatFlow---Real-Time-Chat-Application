import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useForm } from 'react-hook-form';
import { HiSearch } from 'react-icons/hi';
import { SearchUser, GetChatters } from '../../Services/operations/Search_UserApi';
import { setSelectedChat } from '../../Slices/ChatSlice'; 
import { useNavigate } from 'react-router-dom';

const ContactSidebar = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { selectedChat, notification } = useSelector((state) => state.chat); 
    const { onlineUsers } = useSelector((state) => state.socket);

    const [activeTab, setActiveTab] = useState("All");
    const [allChatters, setAllChatters] = useState([]); 
    const [displayedUsers, setDisplayedUsers] = useState([]); 
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const tabs = ["All", "Groups", "Individual"];
    const { register, handleSubmit, reset, watch } = useForm();
    const searchFieldValue = watch("searchField");

    useEffect(() => {
        const fetchInitialChatters = async () => {
            setLoading(true);
            const result = await GetChatters(token);
            if (result) {
                setAllChatters(result);
                setDisplayedUsers(result);
            }
            setLoading(false);
        };
        fetchInitialChatters();
    }, [token]);

    useEffect(() => {
        if (!searchFieldValue || searchFieldValue.trim() === "") {
            setDisplayedUsers(allChatters);
        }
    }, [searchFieldValue, allChatters]);

    const handleSearchUser = async (formData) => {
        const query = formData.searchField.trim();
        if (!query) return;
        setLoading(true);
        const result = await SearchUser(query, token);
        if (result) setDisplayedUsers(result);
        setLoading(false);
    };

    const clearSearch = () => {
        reset({ searchField: "" }); 
        setDisplayedUsers(allChatters); 
    };

    const handle_selected_user = (user) => {
      dispatch(setSelectedChat(user));
        navigate('./message');
    };

    return (
        <aside className="flex flex-col h-full overflow-hidden border-l border-white/5 w-full bg-[#05010a] relative z-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none"></div>

            <div className="p-2 sm:p-6 relative z-10">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); clearSearch(); }}
                            className={`flex-1 py-2 text-[9px] sm:text-[10px] font-black rounded-lg transition-all uppercase ${
                                activeTab === tab 
                                ? "bg-gradient-to-r from-[#4b10b0] to-[#7b2ff7] text-white" 
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <form className="px-2 sm:px-6 pb-4 relative z-10" onSubmit={handleSubmit(handleSearchUser)}>
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-xl p-1">
                    <input 
                        type="text"
                        {...register("searchField")} 
                        placeholder="Search users..."
                        className="w-full bg-transparent py-1.5 sm:py-3 px-2 text-[10px] sm:text-sm text-white outline-none"
                    />
                    <button type="submit">
                        <HiSearch className="mr-2 text-gray-600 hover:text-purple-400 text-sm sm:text-lg" />
                    </button>
                </div>
            </form>

            <div className="flex-1 overflow-y-auto px-1 sm:px-4 pb-10 custom-scrollbar relative z-10">
                <div className="space-y-1">
                    {displayedUsers?.map((user) => {
                        const isOnline = onlineUsers?.includes(user._id);
                        
                        // Count notifications for this user
                        const count = notification?.filter(n => n.sender_id === user._id).length;
                        
                        return (
                            <div 
                                key={user._id} 
                                onClick={() => handle_selected_user(user)}
                                className={`group relative rounded-xl transition-all cursor-pointer ${
                                    selectedChat?._id === user._id ? "bg-white/[0.1]" : "hover:bg-white/[0.05]"
                                }`}
                            >
                                <div className="flex items-center gap-2 sm:gap-4 p-2">
                                    <div className="relative shrink-0">
                                        <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-full p-[1px] bg-white/10">
                                            <div className="h-full w-full rounded-full bg-[#05010a] overflow-hidden">
                                                <img 
                                                    src={user.profile_pic || `https://api.dicebear.com/7.x/initials/svg?seed=${user.first_name}`} 
                                                    alt={user.first_name} 
                                                    className="h-full w-full object-cover" 
                                                />
                                            </div>
                                        </div>
                                        {isOnline && (
                                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 border-2 border-[#05010a] rounded-full"></div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col min-w-0">
                                        <h4 className="text-[10px] sm:text-[12px] font-bold truncate text-white/90 uppercase">
                                            {user.first_name} {user.last_name}
                                        </h4>
                                        <p className="text-[9px] sm:text-[11px] text-gray-500 truncate">
                                            @{user.user_name}
                                        </p>
                                    </div>

                                    {/* GREEN NOTIFICATION BADGE */}
                                    {count > 0 && (
                                        <div className="flex items-center justify-center bg-green-500 text-[#05010a] text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                                            +{count}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default ContactSidebar;