import { useCallback, useEffect } from "react";
import "./App.css";
import { About } from "./components/About";
import { CalfCard, CardType } from "./components/CalfCard";
import { Navbar } from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getPlaceholderCard } from "./utils/placeholderCardData";
import { setCards, setLoadingCards } from "./store/cardsSlice";
import { Theme } from "./store/settingsSlice";

function App() {
  const dispatch = useAppDispatch();
  const cardsState = useAppSelector((state) => state.cards);
  const theme = useAppSelector((state) => state.settings.theme);
  const isDarkMode = theme === Theme.Dark;

  const themeDefaultTopLevelClasses = {
    [Theme.Dark]: "dark:text-stone-200 dark:bg-slate-800",
    [Theme.Light]: "bg-slate-50 text-slate-800",
  };

  const themeClasses = themeDefaultTopLevelClasses[theme];

  const selectNewCards = useCallback(() => {
    const leftCard = getPlaceholderCard();
    const rightCard = getPlaceholderCard();

    dispatch(setCards({ leftCard, rightCard }));
  }, [dispatch]);

  const onCardSelected = () => {
    dispatch(setLoadingCards());
    setTimeout(() => {
      selectNewCards();
    }, 2000);
  };

  useEffect(() => {
    selectNewCards();
  }, [selectNewCards]);

  return (
    <div className={`h-screen ${isDarkMode ? "dark" : ""}`}>
      <div
        className={`flex transition-colors duration-1000 flex-col items-center h-full gap-8 p-8 w-screen ${themeClasses}`}
      >
        <Navbar />
        <div className="flex flex-col items-center gap-4 py-10 w-full">
          <div className="flex flex-row h-64 md:h-64 md:w-3/5 w-full md:justify-center md:gap-20 justify-between px-2">
            <CalfCard
              cardType={CardType.Left}
              cardContents={cardsState.leftCard}
              isShowing={!cardsState.loadingCards}
              onSelected={onCardSelected}
            />
            <CalfCard
              cardType={CardType.Right}
              cardContents={cardsState.rightCard}
              isShowing={!cardsState.loadingCards}
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
