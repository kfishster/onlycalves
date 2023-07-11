import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  VotingCard,
  VotingCardStatus,
  setCards,
  setCardsStatus,
} from "../store/cardsSlice";
import { CalfCard, CardType } from "../components/CalfCard";
import { About } from "../components/About";
import { fetchRandomMatchup, writeMatchupResult } from "../utils/apiConnector";
import { appInsightsTracking } from "../utils/appInsights";

const Home = () => {
  const dispatch = useAppDispatch();
  const cardsState = useAppSelector((state) => state.cards);

  const selectNewCards = useCallback(async () => {
    const matchup = await fetchRandomMatchup();

    if ("error" in matchup) {
      dispatch(setCardsStatus(VotingCardStatus.Error));
    } else {
      dispatch(setCardsStatus(VotingCardStatus.Loading));
      const votingCards: VotingCard[] = matchup.map((m) => ({
        ...m,
        // imgUrl: `${m.containerUrl}/${m.name}`,
        imgUrl: `${m.cdnUrl}/tr:w-400/${m.name}`,
      }));

      const leftCard = votingCards[0];
      const rightCard = votingCards[1];

      dispatch(setCards({ leftCard, rightCard }));
    }

    // const leftCard = matchup[0];
    // const rightCard = getPlaceholderCard(2);

    // dispatch(setCards({ leftCard, rightCard }));
  }, [dispatch]);

  const registerMatchResult = useCallback(
    async (
      leftCard: VotingCard,
      rightCard: VotingCard,
      selectedCard: VotingCard
    ) => {
      await writeMatchupResult({
        userId1: leftCard.userId,
        userId2: rightCard.userId,
        winnerUserId: selectedCard.userId,
      });
    },
    []
  );

  const onCardSelected = (selectedCard?: VotingCard) => {
    if (cardsState.leftCard && cardsState.rightCard && selectedCard) {
      registerMatchResult(
        cardsState.leftCard,
        cardsState.rightCard,
        selectedCard
      );
    }
    dispatch(setCardsStatus(VotingCardStatus.Loading));
    setTimeout(() => {
      selectNewCards();
    }, 501);
  };

  useEffect(() => {
    selectNewCards();
  }, [selectNewCards]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 py-10 w-full">
        <div className="flex flex-row h-40 md:h-64 md:w-3/5 w-3/4 md:justify-center gap-8 md:gap-20 justify-between px-2">
          {cardsState.cardStatus === VotingCardStatus.Error && (
            <div>Oh no something broke :(</div>
          )}
          <CalfCard
            cardType={CardType.Left}
            cardContents={cardsState.leftCard}
            isShowing={cardsState.cardStatus === VotingCardStatus.Ready}
            onSelected={() => onCardSelected(cardsState.leftCard)}
          />
          <CalfCard
            cardType={CardType.Right}
            cardContents={cardsState.rightCard}
            isShowing={cardsState.cardStatus === VotingCardStatus.Ready}
            onSelected={() => onCardSelected(cardsState.rightCard)}
          />
        </div>
      </div>
      <About />
    </div>
  );
};

export default appInsightsTracking("Home", Home);
