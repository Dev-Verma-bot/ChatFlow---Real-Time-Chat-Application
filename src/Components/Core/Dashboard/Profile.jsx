import React, { useState, useEffect } from "react";
import { FaTwitter, FaLinkedin, FaCamera, FaVenusMars, FaCalendarAlt } from "react-icons/fa";
import { HiOutlinePencilAlt, HiCheckCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.profile);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(user);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("social_")) {
            const linkType = name.split("_")[1];
            setUserData(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    social_links: { ...prev.profile.social_links, [linkType]: value }
                }
            }));
        } else if (["age", "gender", "description"].includes(name)) {
            setUserData(prev => ({
                ...prev,
                profile: { ...prev.profile, [name]: value }
            }));
        } else {
            setUserData(prev => ({ ...prev, [name]: value }));
        }
    };

    if (!userData) return null;

    return (
        /* Scroller enabled with h-screen and overflow-y-auto */
        <div className="h-screen w-full bg-black text-white selection:bg-purple-500/30 font-sans overflow-y-auto">
            {/* Header Spacer */}
            <div className="h-32 bg-black border-b border-white/5 w-full" />

            {/* Main Column Container */}
            <div className="max-w-2xl mx-auto px-6 flex flex-col items-center pb-24">
                
                {/* Profile Image - Permanent Circle, No Border */}
                <div className="relative -mt-16 mb-8 group">
                    <img 
                        src={userData.profile_pic} 
                        alt="Profile" 
                        className="w-40 h-40 object-cover rounded-full bg-zinc-900" 
                    />
                    {isEditing && (
                        <label className="absolute bottom-1 right-1 bg-purple-600 p-3 rounded-full cursor-pointer hover:bg-purple-500 transition-all border-4 border-black group-hover:scale-110">
                            <FaCamera className="text-white text-base" />
                            <input type="file" className="hidden" />
                        </label>
                    )}
                </div>

                {/* Name Section - Non-Italic Heading */}
                <div className="w-full space-y-4 mb-10 text-center">
                    {isEditing ? (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="flex flex-col items-start w-full">
                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 ml-1 font-bold">First Name</label>
                                <input 
                                    name="first_name" 
                                    className="bg-zinc-900 border border-white/10 rounded-xl text-lg font-medium outline-none px-5 py-3 w-full focus:border-purple-500 transition-all" 
                                    value={userData.first_name} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 ml-1 font-bold">Last Name</label>
                                <input 
                                    name="last_name" 
                                    className="bg-zinc-900 border border-white/10 rounded-xl text-lg font-medium outline-none px-5 py-3 w-full focus:border-purple-500 transition-all" 
                                    value={userData.last_name} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {/* Removed 'italic' class */}
                            <h1 className="text-4xl font-black tracking-tight text-white uppercase">
                                {userData.first_name} {userData.last_name}
                            </h1>
                            <p className="text-purple-500 font-mono text-sm tracking-widest mt-1">@{userData.user_name}</p>
                        </div>
                    )}
                </div>

                {/* Content Stack */}
                <div className="w-full space-y-6">
                    <section className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600 border-l-2 border-purple-500 pl-4 block">About</label>
                        {isEditing ? (
                            <textarea 
                                name="description" 
                                className="w-full p-5 bg-zinc-900 border border-white/5 rounded-2xl focus:border-purple-500 outline-none min-h-[140px] text-zinc-200 text-lg leading-relaxed" 
                                value={userData.profile?.description} 
                                onChange={handleChange} 
                            />
                        ) : (
                            <p className="text-zinc-400 text-xl leading-relaxed font-light px-4">
                                {userData.profile?.description || "No biography provided."}
                            </p>
                        )}
                    </section>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <DetailItem 
                            icon={<FaCalendarAlt />} 
                            label="Age" 
                            value={`${userData.profile?.age || '--'} Years`} 
                            isEditing={isEditing}
                            input={<input name="age" type="number" className="bg-transparent outline-none w-full text-white font-bold" value={userData.profile?.age} onChange={handleChange} />}
                        />
                        <DetailItem 
                            icon={<FaVenusMars />} 
                            label="Gender" 
                            value={userData.profile?.gender} 
                            isEditing={isEditing}
                            input={
                                <select name="gender" className="bg-transparent outline-none w-full text-white font-bold" value={userData.profile?.gender} onChange={handleChange}>
                                    <option value="male" className="bg-zinc-900">Male</option>
                                    <option value="female" className="bg-zinc-900">Female</option>
                                </select>
                            }
                        />
                    </div>

                    {/* Socials Column */}
                    <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 space-y-4 w-full">
                        <SocialInput icon={<FaTwitter />} label="Twitter" isEditing={isEditing} value={userData.profile?.social_links?.twitter} name="social_twitter" onChange={handleChange} />
                        <SocialInput icon={<FaLinkedin />} label="LinkedIn" isEditing={isEditing} value={userData.profile?.social_links?.linkedin} name="social_linkedin" onChange={handleChange} />
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-8">
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 border ${
                                isEditing 
                                ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]" 
                                : "bg-transparent border-white/10 text-white hover:bg-white hover:text-black"
                            }`}
                        >
                            {isEditing ? <><HiCheckCircle size={18} /> Save Changes</> : <><HiOutlinePencilAlt size={18} /> Edit Profile</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value, isEditing, input }) => (
    <div className="p-5 bg-zinc-900/60 border border-white/5 rounded-2xl">
        <div className="flex items-center gap-4">
            <div className="text-purple-500 text-lg">{icon}</div>
            <div className="flex-1">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
                <div className="text-zinc-100 font-medium">{isEditing ? input : (value || "—")}</div>
            </div>
        </div>
    </div>
);

const SocialInput = ({ icon, label, isEditing, value, name, onChange }) => (
    <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-2xl">
        <div className="text-zinc-500">{icon}</div>
        <div className="flex-1 min-w-0">
            {isEditing ? (
                <input 
                    name={name}
                    className="bg-transparent text-sm w-full outline-none text-purple-400 font-medium"
                    value={value || ""}
                    onChange={onChange}
                    placeholder={`Link`}
                />
            ) : (
                <p className="text-sm text-zinc-400 truncate">{value || `Not connected`}</p>
            )}
        </div>
    </div>
);

export default Profile;