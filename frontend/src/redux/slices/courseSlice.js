import { createSlice } from "@reduxjs/toolkit";

let initialState={
    step:1,
    editCourse:false,
    course:null,
    paymentLoading:false,
  
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

        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        },

    }
});

export const {setStep,setEditCourse,setCourse, resetCourseState,setPaymentLoading}=courseSlice.actions;
export default courseSlice.reducer;