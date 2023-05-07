import { useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Theme, setTagline, setTheme } from "../store/settingsSlice";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrophyIcon } from "@heroicons/react/24/outline";

const taglines = [
  "this is my better calf",
  "calf and calf",
  "calf full, or calf empty? you be the judge",
  "just wait till you see my other calf",
  "(noun) (ˈkävz): The fleshy back part of the leg below the knee",
  "grass fed",
];

export function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const tagline = useAppSelector((state) => state.settings.tagline);

  useEffect(() => {
    dispatch(setTagline(taglines[Math.floor(Math.random() * taglines.length)]));
  }, [dispatch]);

  return (
    <div className="flex flex-row items-center gap-4 justify-between h-24 w-screen px-8">
      <Link to="/">
        <div className="flex md:h-32 md:w-32 w-20 h-20 items-center align-center text-center">
          <img src="/logo512.png" alt="logo" />
        </div>
      </Link>
      <div className="flex flex-col items-center gap-1 text-center p-1">
        <h1 className="flex text-3xl md:text-5xl font-bold">OnlyCalves</h1>
        <h1 className="flex text-lg md:text-2xl font-light">{tagline}</h1>
      </div>
      <div className="flex md:flex-row flex-col-reverse md:w-32 w-20 gap-2 items-center">
        <Link to="/calfConfig">
          <div className="w-6 h-6">
            <PencilSquareIcon />
          </div>
        </Link>
        <Link to="/leaderboard">
          <div className="w-6 h-6">
            <TrophyIcon />
          </div>
        </Link>
        <DarkModeToggle
          onChange={() =>
            dispatch(setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark))
          }
          checked={theme === Theme.Dark}
          size={60}
        />
      </div>
    </div>
  );
}
