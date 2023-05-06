import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CalfUser {
  userId: string;
  nickname: string;
}

export enum UserStatus {
  Ready,
  Loading,
  Error,
}

interface UsersState {
  userStatus: UserStatus;
  users: CalfUser[];
}

const initialState: UsersState = {
  users: [],
  userStatus: UserStatus.Loading,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserStatus: (state, action: PayloadAction<UserStatus>) => {
      state.userStatus = action.payload;
    },
    setUsers: (state, action: PayloadAction<CalfUser[]>) => {
      state.users = action.payload;
      state.userStatus = UserStatus.Ready;
    },
  },
});

export const { setUserStatus, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
