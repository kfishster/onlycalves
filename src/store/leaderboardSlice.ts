import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LeaderboardRow {
  userId: string;
  nickname: string;
  score: number;
  matchups: number;
  approval: number;
}

export enum LeaderboardStatus {
  Loading,
  Ready,
  Error,
}

interface LeaderboardState {
  leaderboardRows: LeaderboardRow[];
  totalCount: number;
  status: LeaderboardStatus;
}

const initialState: LeaderboardState = {
  leaderboardRows: [],
  totalCount: 0,
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
    setTotalVotes: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setLeaderboardRows, setLeaderboardStatus, setTotalVotes } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;
