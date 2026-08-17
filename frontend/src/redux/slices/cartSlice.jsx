import {createSlice} from "@reduxjs/toolkit"

const initialState={
    totalItems:1
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducer:{
        setTotalItem:(state,action)=>{
            state.totalItems=action.payload
        }

    }
});

export const {setTotalItem} =cartSlice.actions;
export default cartSlice.reducer;
