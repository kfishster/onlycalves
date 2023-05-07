import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LeaderboardRow {
  userId: string;
  nickname: string;
  score: number;
}

export enum LeaderboardStatus {
  Loading,
  Ready,
  Error,
}

interface LeaderboardState {
  leaderboardRows: LeaderboardRow[];
  status: LeaderboardStatus;
}

const initialState: LeaderboardState = {
  leaderboardRows: [],
  status: LeaderboardStatus.Loading,
};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboardRows: (state, action: PayloadAction<LeaderboardRow[]>) => {
      state.leaderboardRows = action.payload;
      state.status = LeaderboardStatus.Ready;
    },
    setLeaderboardStatus: (state, action: PayloadAction<LeaderboardStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setLeaderboardRows, setLeaderboardStatus } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;
