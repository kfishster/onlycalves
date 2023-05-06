import { useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Theme, setTagline, setTheme } from "../store/settingsSlice";
import { Link } from "react-router-dom";

const taglines = [
  "this is my better calf",
  "calf and calf",
  "calf full, or calf empty? you be the judge",
  "just wait till you see my other calf",
  "(noun) (ˈkävz): The fleshy back part of the leg below the knee",
];

export function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const tagline = useAppSelector((state) => state.settings.tagline);

  useEffect(() => {
    dispatch(setTagline(taglines[Math.floor(Math.random() * taglines.length)]));
  }, [dispatch]);

  return (
    <div className="flex flex-row items-center gap-2 justify-between h-24 w-screen px-8">
      <div className="flex h-32 w-32 items-center align-center text-center">
        <img src="/logo512.png" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center p-1">
        <Link to="/">
          <h1 className="flex text-3xl md:text-5xl font-bold">OnlyCalves</h1>
        </Link>
        <h1 className="flex text-lg md:text-2xl font-light">{tagline}</h1>
      </div>
      <DarkModeToggle
        onChange={() =>
          dispatch(setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark))
        }
        checked={theme === Theme.Dark}
        size={60}
      />
    </div>
  );
}
