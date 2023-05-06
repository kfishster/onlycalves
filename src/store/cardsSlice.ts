import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VotingCard {
  userId: string;
  imgUrl: string;
  title: string;
  subtitle: string;
}

export enum VotingCardStatus {
  Loading,
  Ready,
  Error,
}

interface CardState {
  leftCard?: VotingCard;
  rightCard?: VotingCard;
  cardStatus: VotingCardStatus;
}

const initialState: CardState = {
  cardStatus: VotingCardStatus.Loading,
};

interface SetCardPayload {
  leftCard: VotingCard;
  rightCard: VotingCard;
}

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<SetCardPayload>) => {
      state.leftCard = action.payload.leftCard;
      state.rightCard = action.payload.rightCard;
      state.cardStatus = VotingCardStatus.Ready;
    },
    setCardsStatus: (state, action: PayloadAction<VotingCardStatus>) => {
      state.cardStatus = action.payload;
    },
  },
});

export const { setCards, setCardsStatus } = cardsSlice.actions;
export default cardsSlice.reducer;
