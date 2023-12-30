

import { createSlice } from '@reduxjs/toolkit';


const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem('user')) || {}
    
}
const generalSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
      setuser:(state,action)=>{
        state.user=action.payload
        localStorage.setItem("user",JSON.stringify(action.payload))
      }  
    },
});

export const { setuser} = generalSlice.actions;
export default generalSlice.reducer;