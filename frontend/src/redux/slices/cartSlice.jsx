import toast from "react-hot-toast"
import { createSlice } from "@reduxjs/toolkit"

let initialState={

    cart:localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[],
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0
}

const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{

        addToCart: (state, action) => {
            const course = action.payload;

            const alreadyExists = state.cart.find(
                (item) => item._id === course._id
            );

            if (alreadyExists) {
                toast.error("Course already in cart");
                return;
            }

            state.cart.push(course);

            state.totalItems = state.cart.length;

            state.total = state.cart.reduce(
                (total, item) => total + item.price,
                0
            );

            localStorage.setItem( "cart", JSON.stringify(state.cart) );
            localStorage.setItem( "total", JSON.stringify(state.total) );
            localStorage.setItem( "totalItems", JSON.stringify(state.totalItems) );
            toast.success("Course added to cart");

        },

       removeFromCart: (state, action) => {
            const courseId = action.payload;

            // Remove course
            state.cart = state.cart.filter(
                (item) => item._id !== courseId
            );

            // Update total items
            state.totalItems = state.cart.length;

            // Update total price
            state.total = state.cart.reduce(
                (total, item) => total + item.price,
                0
            );

            // Update localStorage
            localStorage.setItem( "cart", JSON.stringify(state.cart) );
            localStorage.setItem( "total", JSON.stringify(state.total) );
            localStorage.setItem( "totalItems", JSON.stringify(state.totalItems) );

            toast.success("Course removed from cart");
        },

        resetCart:(state)=>{

            state.total = 0;
            state.totalItems = 0;
            state.cart = [];
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")

        }


    }

})

export const {addToCart,removeFromCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;

