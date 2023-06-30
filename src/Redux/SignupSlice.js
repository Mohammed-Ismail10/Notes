import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

let initialState = { alert: null, loading: null }

export let signupPost = createAsyncThunk('signup/signupPost', async (value) => {
  let { data } = await axios.post(`https://route-movies-api.vercel.app/signup`, value)
  return data
})




export let signupSlice = createSlice({
  name: 'signup',
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
  },
  extraReducers: (builder) => {
    builder.addCase(signupPost.fulfilled, (initialState, action) => {

    })
  }
})


export let signupReducer = signupSlice.reducer;
export let { alertError, loadingTrue, loadingFalse } = signupSlice.actions;