import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:window.localStorage.getItem("user")?true:false,
    user:JSON.parse(window.localStorage.getItem("user"))
}
export const loginSlice=createSlice({
    name:"loginSlice",
    initialState,
    reducers:{
        updateLoginStatus:(state,action)=>{
            state.isLoggedIn=action.payload.status;
            state.user=action.payload.user;
        }
    }
})
export const {updateLoginStatus}=loginSlice.actions;
export default loginSlice.reducer