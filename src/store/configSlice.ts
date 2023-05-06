import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomImgUrl } from "../utils/placeholderCardData";

export interface CalfConfig {
  userId: string;
  nickname: string;
  title: string;
  subtitle: string;
  isEnabled: boolean;
}

export interface SetPictureStatusProps {
  status: CalfPictureStatus;
  pictureUrl: string;
}

export enum CalfPictureStatus {
  Uploaded,
  Local,
  Delete,
  UploadInProgress,
}

export interface CalfPicture {
  file?: File;
  name?: string;
  pictureUrl: string;
  pictureStatus: CalfPictureStatus;
}

export enum ConfigStatus {
  Ready,
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
  pictures: CalfPicture[];
}

// const staticPictureUrls = [
//   getRandomImgUrl(),
//   getRandomImgUrl(),
//   getRandomImgUrl(),
// ];

const initialState: ConfigState = {
  status: ConfigStatus.Loading,
  configType: ConfigType.New,
  //   pictures: staticPictureUrls.map((p) => ({
  //     pictureUrl: p,
  //     pictureStatus: CalfPictureStatus.Uploaded,
  //   })),
  pictures: [],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfigStatus: (state, action: PayloadAction<ConfigStatus>) => {
      state.status = action.payload;
    },
    newUser: (state, action: PayloadAction<string>) => {
      state.config = {
        userId: action.payload,
        nickname: "",
        title: "",
        subtitle: "",
        isEnabled: true,
      };

      state.configType = ConfigType.New;
      state.status = ConfigStatus.Ready;
      state.pictures = [];
    },
    fetchedConfig: (state, action: PayloadAction<CalfConfig>) => {
      state.status = ConfigStatus.Ready;
      state.config = action.payload;
      state.configType = ConfigType.Existing;
    },
    setConfigNickname: (state, action: PayloadAction<string>) => {
      if (state.config) {
        state.config.nickname = action.payload;
        state.status = ConfigStatus.Ready;
      }
    },
    setConfigTitle: (state, action: PayloadAction<string>) => {
      if (state.config) {
        state.config.title = action.payload;
        state.status = ConfigStatus.Ready;
      }
    },
    setConfigSubtitle: (state, action: PayloadAction<string>) => {
      if (state.config) {
        state.config.subtitle = action.payload;
        state.status = ConfigStatus.Ready;
      }
    },
    setConfigEnabled: (state, action: PayloadAction<boolean>) => {
      if (state.config) {
        state.config.isEnabled = action.payload;
      }
    },
    setPictureStatus: (state, action: PayloadAction<SetPictureStatusProps>) => {
      const pic = state.pictures.find(
        (p) => p.pictureUrl === action.payload.pictureUrl
      );
      if (pic) {
        pic.pictureStatus = action.payload.status;
      }
    },
    fetchedPictures: (state, action: PayloadAction<CalfPicture[]>) => {
      state.pictures = action.payload;
    },
    addPicture: (state, action: PayloadAction<CalfPicture>) => {
      state.pictures.push(action.payload);
    },
    deletePicture: (state, action: PayloadAction<string>) => {
      const picToDelete = state.pictures.find(
        (p) => p.pictureUrl === action.payload
      );
      if (picToDelete) {
        if (picToDelete.pictureStatus === CalfPictureStatus.Local) {
          state.pictures = state.pictures.filter(
            (p) => p.pictureUrl !== action.payload
          );
        } else if (picToDelete.pictureStatus === CalfPictureStatus.Uploaded) {
          picToDelete.pictureStatus = CalfPictureStatus.Delete;
        }
      }
    },
    removePicture: (state, action: PayloadAction<string>) => {
      const picToDelete = state.pictures.find(
        (p) => p.pictureUrl === action.payload
      );
      if (picToDelete) {
        state.pictures = state.pictures.filter(
          (p) => p.pictureUrl !== action.payload
        );
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
  newUser,
  fetchedPictures,
  addPicture,
  deletePicture,
  setPictureStatus,
  removePicture,
  setConfigEnabled,
} = configSlice.actions;
export default configSlice.reducer;
