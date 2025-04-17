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
          top-[390px]
          left-[30%]
          z-10
          flex 
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
        flex-grow
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
