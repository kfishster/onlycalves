import "./App.css";
import { Navbar } from "./components/Navbar";
import { useAppSelector } from "./store/hooks";
import { Theme } from "./store/settingsSlice";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { CalfConfigPage } from "./pages/CalfConfig";

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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "calfConfig/:userId",
          element: <CalfConfigPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
