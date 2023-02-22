import { useState } from "react";
import "./App.css";
import { About } from "./components/About";
import { CalfCard, CardType } from "./components/CalfCard";
import { Navbar } from "./components/Navbar";

function App() {
  const isSystemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [isDarkMode, useDarkMode] = useState(isSystemDarkMode);

  const themeDefaultTopLevelClasses = {
    dark: "dark:text-stone-200 dark:bg-slate-800",
    light: "bg-slate-50 text-slate-800",
  };

  const themeClasses = isDarkMode
    ? themeDefaultTopLevelClasses["dark"]
    : themeDefaultTopLevelClasses["light"];

  return (
    <div className={`h-screen ${isDarkMode ? "dark" : ""}`}>
      <div
        className={`flex transition-colors duration-1000 flex-col items-center h-full gap-8 p-8 w-screen ${themeClasses}`}
      >
        <Navbar isDarkMode={isDarkMode} useDarkMode={useDarkMode} />
        {/* <p>Choose the better calf</p> */}
        <div className="group flex flex-col items-center gap-4 pt-10">
          {/* <img
            src="https://thumbs.dreamstime.com/b/fitness-healthy-leg-muscle-leg-muscleillustration-design-vector-isolated-white-background-122386596.jpg"
            className="flex h-80 w-80 animate-slowspin"
            alt="logo"
          /> */}
          <div className="flex flex-row h-52 md:h-64 items-center md:w-3/5 w-full md:justify-center md:gap-20 justify-between px-2">
            <CalfCard
              cardType={CardType.Left}
              title="Calf 2"
              subtitle="Scorpio, but doesn't act like it"
            />
            <CalfCard
              cardType={CardType.Right}
              title="Calf 6"
              subtitle="Exfoliates regularly"
            />
          </div>
          <p className="label flex text-3xl invisible group-hover:visible pt-8">
            Definition (noun) (ˈkävz): The fleshy back part of the leg below the
            knee
          </p>
        </div>
        <About />
      </div>
    </div>
  );
}

export default App;
