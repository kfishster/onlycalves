import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice";
import settingsSlice from "./settingsSlice";
import configSlice from "./configSlice";
import usersSlice from "./usersSlice";
import leaderboardSlice from "./leaderboardSlice";

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    settings: settingsSlice,
    config: configSlice,
    users: usersSlice,
    leaderboard: leaderboardSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
