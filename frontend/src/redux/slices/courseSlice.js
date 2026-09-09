import { createSlice } from "@reduxjs/toolkit";

let initialState={
    step:1,
    editCourse:false,
    course:null
  
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{

        setStep:(state,action)=>{
            state.step=action.payload
        },
        setCourse:(state,action)=>{
            state.course=action.payload
        },
        setEditCourse:(state,action)=>{
            state.editCourse=action.payload
        }

    }
});

export const {setStep,setEditCourse,setCourse}=courseSlice.actions;
export default courseSlice.reducer;