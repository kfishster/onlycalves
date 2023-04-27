import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPlaceholderCard } from "../utils/placeholderCardData";
import { setCards, setLoadingCards } from "../store/cardsSlice";
import { CalfCard, CardType } from "../components/CalfCard";
import { About } from "../components/About";

export const Home = () => {
  const dispatch = useAppDispatch();
  const cardsState = useAppSelector((state) => state.cards);

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
    <>
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
    </>
  );
};
