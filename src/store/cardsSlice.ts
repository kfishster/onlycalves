import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface VotingCard {
    imgUrl: string;
    title: string;
    subtitle: string;
  }

interface CardState {
  leftCard?: VotingCard
  rightCard?: VotingCard
  loadingCards: boolean
}

const initialState: CardState = {
    loadingCards: true
}

interface SetCardPayload {
    leftCard: VotingCard
    rightCard: VotingCard
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<SetCardPayload> ) => {
      state.leftCard = action.payload.leftCard
      state.rightCard = action.payload.rightCard
      state.loadingCards = false
    },
    setLoadingCards: (state) => {
        state.loadingCards = true
    }
  }
})

export const { setCards, setLoadingCards } = cardsSlice.actions
export default cardsSlice.reducer