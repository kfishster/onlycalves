import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CalfConfig {
  userId: string;
  nickname: string;
  title: string;
  subtitle: string;
}

export enum ConfigStatus {
  Loaded,
  Loading,
  Saving,
  Saved,
  Error,
}

export enum ConfigType {
  New,
  Existing,
}

export interface ConfigState {
  status: ConfigStatus;
  configType: ConfigType;
  config?: CalfConfig;
}

const initialState: ConfigState = {
  status: ConfigStatus.Loading,
  configType: ConfigType.New,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfigStatus: (state, action: PayloadAction<ConfigStatus>) => {
      state.status = action.payload;
    },
    fetchedConfig: (state, action: PayloadAction<CalfConfig>) => {
      state.status = ConfigStatus.Loaded;
      state.config = action.payload;
      state.configType = ConfigType.Existing;
    },
    setConfigNickname: (state, action: PayloadAction<string>) => {
      if (state.config) {
        state.config.nickname = action.payload;
        state.status = ConfigStatus.Loaded;
      }
    },
    setConfigTitle: (state, action: PayloadAction<string>) => {
      if (state.config) {
        state.config.title = action.payload;
        state.status = ConfigStatus.Loaded;
      }
    },
    setConfigSubtitle: (state, action: PayloadAction<string>) => {
      if (state.config) {
        state.config.subtitle = action.payload;
        state.status = ConfigStatus.Loaded;
      }
    },
  },
});

export const {
  setConfigStatus,
  fetchedConfig,
  setConfigNickname,
  setConfigTitle,
  setConfigSubtitle,
} = configSlice.actions;
export default configSlice.reducer;
