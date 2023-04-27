import "./App.css";
import { Navbar } from "./components/Navbar";
import { useAppSelector } from "./store/hooks";
import { Theme } from "./store/settingsSlice";
import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CalfConfig } from "./pages/CalfConfig";

const AppLayout = () => {
  const theme = useAppSelector((state) => state.settings.theme);
  const isDarkMode = theme === Theme.Dark;

  const themeDefaultTopLevelClasses = {
    [Theme.Dark]: "dark:text-stone-200 dark:bg-slate-800",
    [Theme.Light]: "bg-slate-50 text-slate-800",
  };

  const themeClasses = themeDefaultTopLevelClasses[theme];

  return (
    <div className={`h-screen ${isDarkMode ? "dark" : ""}`}>
      <div
        className={`flex transition-colors duration-1000 flex-col items-center h-full gap-8 p-8 w-screen ${themeClasses}`}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="calfConfig" element={<CalfConfig />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
