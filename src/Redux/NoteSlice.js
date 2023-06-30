import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import jwtDecode from 'jwt-decode'

let initialState = { token: null, userID: null, myNotes: [], resultSearch: null }

initialState.token = localStorage.getItem('token');
if(initialState.token){
  initialState.userID = jwtDecode(initialState.token)._id;
}



export let notePost = createAsyncThunk('note/notePost', async (value) => {
  let { data } = await axios.post(`https://route-movies-api.vercel.app/addNote`, value)
  return data
})

export let notesGet = createAsyncThunk('note/notesGet', async (headers) => {
  let { data } = await axios.get(`https://route-movies-api.vercel.app/getUserNotes`, {
    headers
  })
  return data
})

export let noteDelete = createAsyncThunk('note/noteDelete', async ({ NoteID, token }) => {
  let { data } = await axios.delete(`https://route-movies-api.vercel.app/deleteNote`, {
    data: {
      NoteID,
      token
    }
  })
  return data
})

export let noteUpdate = createAsyncThunk('note/noteUpdate', async (value) => {
  let { data } = await axios.put(`https://route-movies-api.vercel.app/updateNote`, value)
  return data
})




export let noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    search: (initialState, { payload }) => {
      initialState.resultSearch = [];
      initialState.resultSearch = initialState.myNotes.filter((note) => note.title.toLowerCase().includes(payload.toLowerCase()) || note.desc.toLowerCase().includes(payload.toLowerCase()));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(notePost.fulfilled, (initialState, action) => {

    })
      .addCase(notesGet.fulfilled, (initialState, action) => {
        initialState.myNotes = action.payload.Notes;
      })
      .addCase(noteDelete.fulfilled, (initialState, action) => {

      })
      .addCase(noteUpdate.fulfilled, (initialState, action) => {

      })
  }
})


export let noteReducer = noteSlice.reducer;
export let { search } = noteSlice.actions;