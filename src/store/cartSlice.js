
import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../cart-items";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartList: cartItems,
        total: 0,
        amount: 0
    },
    reducers: {
        increase (state, action) {
            let updatedCartList = state.cartList.map((cartItem) => (
                cartItem.id === action.payload.id ? cartItem = {...cartItem, amount: cartItem.amount + 1} : cartItem //if caritem match the id we passed then simple unpacking the cartItem and increasing amount
            )) 
           
            return {...state, cartList: updatedCartList};
            
        },
        //so if we are decreasing the amount and its 1 then remove that item from the cart else keep decreasing the value
        decrease (state, action) {
            let updatedCartList = [];
            //if its 1 remve that item and update the cartList as Empty array
            if(action.payload.amount === 1){
                 updatedCartList = state.cartList.filter(
                    (item) => item.id !== action.payload.id
                  );
                return {...state, cartList: updatedCartList, total: 0};

            }else{
                updatedCartList = state.cartList.map((cartItem) => (
                    cartItem.id === action.payload.id ? cartItem = {...cartItem, amount: cartItem.amount - 1} : cartItem
                ))
                let total = state.total - action.payload.price;
                return {...state, cartList: updatedCartList, total: total}
            }
        },

        removeFromCart (state, action){
            const updatedCartList = state.cartList.filter(
                (item) => item.id !== action.payload.id
              );
            const total = state.total - action.payload.price;
            return {...state, cartList: updatedCartList , total: total};
        },

        cartTotal(state, action) {
            //cartTotal is representing the empty object initalyy total and amount
            //destructing the total and amount from the object
            let {total, amount} = state.cartList.reduce((cartTotal, cartItem) => {
                let {price, amount} = cartItem
                const itemTotal = amount * price;
                cartTotal.total += itemTotal; 
                cartTotal.amount += amount;
                return cartTotal
            }, {
                total: 0,
                amount: 0
            })
            return {...state, total: total, amount: amount}
        },

        clearCart (state) {
            return {...state, cartList:[], total: 0};
        }
    }
 })

export const { increase, clearCart, decrease, removeFromCart, cartTotal } = cartSlice.actions;

export default cartSlice.reducer;
