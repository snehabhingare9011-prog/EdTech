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
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editCourse = false
        },

    }
});

export const {setStep,setEditCourse,setCourse, resetCourseState}=courseSlice.actions;
export default courseSlice.reducer;