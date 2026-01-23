import React from 'react';
import HeroImage from "../Components/Core/Homepage/HeroImage";
import chatHeroImg from "../assets/Images/girl_chatting.jpg";
import features from '../Data/Homepage_data/FeatureCard';
import FeatureCard from '../Components/Core/Homepage/Feature_card';
import { Link } from 'react-router-dom';
import howItWorksData from '../Data/Homepage_data/How_it_work_data';
import HowItWorksCard from '../Components/Core/Homepage/How_it_work_card';
import socketImg from "../assets/Images/Socket_image.png";
import ChatCTA from '../Components/Core/Homepage/Chat_section';
import Footer from '../Components/Common/Footer';

const Homepage = () => {
    return (
        <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#000000] text-white">
            
            {/* --- GLOBAL ATMOSPHERE --- */}
            <div className="absolute top-[-5%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute top-[20%] right-[-5%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
            
            {/* HERO SECTION */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-16 lg:flex-row lg:py-32">
                <div className="flex-1 space-y-8 z-10">
                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
                        Connect Instantly, <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
                            Chat Seamlessly
                        </span>
                    </h1>
                    <p className="max-w-lg text-lg text-slate-400 leading-relaxed">
                        Experience real-time messaging with end-to-end encryption. 
                        Connect with friends and family instantly with our 
                        premium dark-themed interface.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link to={"/login"} className="group relative overflow-hidden rounded-full bg-indigo-600 px-10 py-4 text-md font-bold transition-all duration-200 hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-500/20">
                            Get Started Free
                        </Link>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <HeroImage imageSrc={chatHeroImg} />
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-5xl">
                        Everything you need to <span className="text-indigo-400">connect</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} index={index} title={feature.title} description={feature.description} />
                    ))}
                </div>
            </div>

            {/* HOW IT WORKS SECTION */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
                <div className="mb-20 text-center space-y-4">
                    <h2 className="text-4xl font-extrabold text-white sm:text-6xl">
                        How It <span className="text-indigo-400">Works</span>
                    </h2>
                    <p className="text-xl text-slate-400">Get started in three simple steps</p>
                </div>
                <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
                    {howItWorksData.map((step, index) => (
                        <HowItWorksCard key={index} index={index} title={step.title} description={step.description} />
                    ))}
                </div>
            </div>

            {/* SOCKET SECTION (WITH UPDATED COLORS & GRADIENT BACKGROUND) */}
            <div className="relative py-24 overflow-hidden">
                {/* Section Specific Gradient Background */}
                <div className="absolute top-1/2 right-[50px]  -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-indigo-500/15 blur-[120px] pointer-events-none" />
                
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
                        
                        {/* LEFT SIDE: TEXT CONTENT */}
                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                                    Powered by <br />
                                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
                                        Socket.io Real-Time
                                    </span>
                                </h2>
                                <p className="max-w-lg text-lg text-slate-400 leading-relaxed">
                                    Our platform leverages the industry-standard Socket.io engine to ensure 
                                    your messages deliver in under <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">50ms</span>. 
                                    Experience truly bidirectional communication.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-colors">
                                    <h4 className="text-indigo-400 font-bold mb-1">Low Latency</h4>
                                    <p className="text-xs text-slate-500">Optimized binary data transfer for instant updates.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-colors">
                                    <h4 className="text-purple-400 font-bold mb-1">Auto-Reconnect</h4>
                                    <p className="text-xs text-slate-500">Stay connected even on spotty mobile networks.</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: IMAGE */}
                        <div className="flex-1 w-full">
                            <HeroImage imageSrc={socketImg} />
                        </div>
                    </div>
                </div>
            </div>

                    {/* second last section  */}
                    <ChatCTA/>
            <div className="h-32 w-full bg-gradient-to-t from-indigo-950/20 to-transparent" />
        <Footer/>
        </div>

    );
}

export default Homepage;