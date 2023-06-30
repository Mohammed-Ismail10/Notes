import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

let initialState = { alert: null, loading: null, userData: null }

export let loginPost = createAsyncThunk('login/loginPost', async (value) => {
  let { data } = await axios.post(`https://route-movies-api.vercel.app/signin`, value)
  return data
})




export let loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    alertError: (initialState, action) => {
      initialState.alert = action.payload;
    },
    loadingTrue: (initialState) => {
      initialState.loading = true;
    },
    loadingFalse: (initialState) => {
      initialState.loading = false;
    },
    saveUserData: (initialState) => {
      if (localStorage.getItem('token')) {
        initialState.userData = localStorage.getItem('token');
      }
    },
    logout: (initialState) => {
      localStorage.removeItem('token');
      initialState.userData = null;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(loginPost.fulfilled, (initialState, action) => {

    })
  }
})


export let loginReducer = loginSlice.reducer;
export let { alertError, loadingTrue, loadingFalse, logout, saveUserData } = loginSlice.actions;