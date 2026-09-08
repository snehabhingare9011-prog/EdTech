import { createSlice } from "@reduxjs/toolkit";

let initialState={
    step:1
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{

        setStep:(state,action)=>{
            state.step=action.payload
        }

    }
});

export const {setStep}=courseSlice.actions;
export default courseSlice.reducer;