import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventList:[],
  isOpen: true,
  saveVote:null
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
    setSaveVote:(state,action)=>{
      state.saveVote=action.payload
    }
  },
});

export const {  toggleSideBar, setEventList,setSaveVote } = commonSlice.actions;
export default commonSlice.reducer;
