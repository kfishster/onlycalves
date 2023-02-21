import { useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

export interface NavbarProps {
  isDarkMode: boolean;
  useDarkMode: (isChecked: boolean) => void;
}

const taglines = [
  "this is my better calf",
  "calf and calf",
  "calf full, or calf empty? you be the judge",
  "just wait till you see my other calf",
];

export function Navbar({ isDarkMode, useDarkMode }: NavbarProps) {
  const [tagline, setTagline] = useState("Loading...");

  useEffect(() => {
    setTagline(taglines[Math.floor(Math.random() * taglines.length)]);
  }, []);

  return (
    <div className="flex flex-row items-center gap-2 justify-between h-24 w-screen px-8">
      <div className="flex h-14 w-14 transition-all bg-gradient-to-br from-indigo-200 to-sky-300 dark:from-sky-700 dark:to-indigo-800 items-center align-center text-center">
        <p className="flex text-xs">Cool Logo</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1 className="flex text-5xl font-bold">OnlyCalves</h1>
        <h1 className="flex text-2xl font-light">{tagline}</h1>
      </div>
      <DarkModeToggle onChange={useDarkMode} checked={isDarkMode} size={60} />
    </div>
  );
}
