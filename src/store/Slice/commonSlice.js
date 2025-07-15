import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventList: [],
  isOpen: true,
  saveVote: null,
  userInfo: {
    username: "",
    email: ""
  }
};
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    // Toggle action
    toggleSideBar: (state) => {
      state.isOpen = !state.isOpen;
    },

    setEventList: (state, action) => {
      state.eventList = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setSaveVote: (state, action) => {
      state.saveVote = action.payload
    }
  },
});

export const { toggleSideBar, setEventList, setSaveVote, setUserInfo } = commonSlice.actions;
export default commonSlice.reducer;
