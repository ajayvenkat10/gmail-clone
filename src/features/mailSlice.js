import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMail: null,
  sendMessageIsOpen: false,
  reloadMailList : false,
  status: 'idle',
};

export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    shouldReloadMailList: (state) => {
      state.reloadMailList = true;
    },
    shouldNotReloadMailList: (state) => {
      state.reloadMailList = false;
    }
  },
});

export const { openSendMessage, closeSendMessage, selectMail, shouldReloadMailList, shouldNotReloadMailList } = mailSlice.actions;

export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;

export const selectOpenMail = (state) => state.mail.selectedMail;

export const selectReloadMailList = (state) => state.mail.reloadMailList;

export default mailSlice.reducer;
