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
  const [isShowing, setIsShowing] = useState(true);

  const themeDefaultTopLevelClasses = {
    dark: "dark:text-stone-200 dark:bg-slate-800",
    light: "bg-slate-50 text-slate-800",
  };

  const themeClasses = isDarkMode
    ? themeDefaultTopLevelClasses["dark"]
    : themeDefaultTopLevelClasses["light"];

  const onCardSelected = () => {
    setIsShowing(false);
    setTimeout(() => {
      setIsShowing(true);
    }, 1000);
  };

  return (
    <div className={`h-screen ${isDarkMode ? "dark" : ""}`}>
      <div
        className={`flex transition-colors duration-1000 flex-col items-center h-full gap-8 p-8 w-screen ${themeClasses}`}
      >
        <Navbar isDarkMode={isDarkMode} useDarkMode={useDarkMode} />
        <div className="flex flex-col items-center gap-4 py-10 w-full">
          <div className="flex flex-row h-64 md:h-64 md:w-3/5 w-full md:justify-center md:gap-20 justify-between px-2">
            <CalfCard
              cardType={CardType.Left}
              title="Calf 2"
              subtitle="Scorpio, but doesn't act like it"
              isShowing={isShowing}
              onSelected={onCardSelected}
            />
            <CalfCard
              cardType={CardType.Right}
              title="Calf 6"
              subtitle="Exfoliates regularly"
              isShowing={isShowing}
              onSelected={onCardSelected}
            />
          </div>
        </div>
        <About />
      </div>
    </div>
  );
}

export default App;
