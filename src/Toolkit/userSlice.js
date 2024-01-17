

import { createSlice } from '@reduxjs/toolkit';


const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem('user')) || {},
    searchText:'',
    
}
const generalSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
      setuser:(state,action)=>{
        state.user=action.payload
        localStorage.setItem("user",JSON.stringify(action.payload))
      },  
      setsearchText:(state,action)=>{
        state.searchText=action.payload  
      }
    },
});

export const { setuser,setsearchText} = generalSlice.actions;
export default generalSlice.reducer;