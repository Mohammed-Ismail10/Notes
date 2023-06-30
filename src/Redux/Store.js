import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginSlice.js";
import { noteReducer } from "./NoteSlice.js";
import { signupReducer } from "./SignupSlice.js";





export let store = configureStore({
  reducer:{
    signup:signupReducer,
    login:loginReducer,
    note:noteReducer
  }
})