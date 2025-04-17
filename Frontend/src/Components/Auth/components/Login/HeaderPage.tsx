import { useState } from "react";

export default function HeaderPage() {
  const [welcomeClicked, setWelcomeClicked] = useState(false);

  const handleWelcomeClick = () => {
    setWelcomeClicked(!welcomeClicked);
  };
  return (
    <div
      onClick={handleWelcomeClick}
      className="
          fixed 
          top-[380px]  {/* Aumentato da 380px a 480px per posizionare più in basso */}
          left-1/6
          -translate-x-1/2 
          grow 
          flex-col 
          items-start 
          cursor-pointer
        "
    >
      <h1
        className="
        text-3xl 
        font-bold 
        text-[var(--primary-color)]
        mb-4
        animate-pulse
        grow
          "
      >
        WELCOME TO
      </h1>
      <h2
        className={`
        text-8xl 
        font-extrabold 
        text-[var(--primary-color)] 
        transition-all 
        duration-300 
        flexgrow
        ease-in-out 
        hover:text-white 
        hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.9)] 
        hover:animate-bounce
        ${welcomeClicked ? "scale-110" : ""}
          `}
      >
        DROCSID
      </h2>
    </div>
  );
}
