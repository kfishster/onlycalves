import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum Theme {
    Light,
    Dark
}

interface SettingState {
    theme: Theme;
    tagline: string;
}

const initialState: SettingState = {
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light,
    tagline: "Loading..."
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme> ) => {
      state.theme = action.payload
    },
    setTagline: (state, action: PayloadAction<string>) => {
        state.tagline = action.payload
    }
  }
})

export const { setTheme, setTagline } = settingsSlice.actions
export default settingsSlice.reducer