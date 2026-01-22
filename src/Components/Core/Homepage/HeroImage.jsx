import React from 'react';

const HeroImage = ({ imageSrc }) => {
  return (
    <div className="relative mx-auto w-full max-w-[600px] animate-float">
      
     
      <div className="relative overflow-hidden rounded-[1.5rem] 
        border border-white/10 bg-[#161B22] p-5 shadow-2xl">
        <img 
          src={imageSrc} 
          className="w-full h-auto rounded-[1rem] object-cover"
         />
      </div>
    </div>
  );
};

export default HeroImage;