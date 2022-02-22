import { createSlice } from "@reduxjs/toolkit";


const initialState = {
                        items:[],
                        totalAmount:0,
                        totalQuantity:0,
                        changed: false
                    };
const cartSlice = createSlice({
        name:"cart",
        initialState:initialState,
        reducers:{
            replaceCart(state,action){
                state.items = action.payload.items
                state.totalQuantity = action.payload.totalQuantity
                state.totalAmount = action.payload.items.reduce((prev,next ) => prev + next.totalPrice, 0)
            },
            addToCart(state,action){
                const item = action.payload;
                state.changed = true;
                const existingItem = state.items.find(cartItem => cartItem.id === item.id);
                state.totalQuantity++;
                if(!existingItem){
                    state.items.push({
                        id:item.id,
                        price:item.price,
                        quantity:1,
                        totalPrice:item.price,
                        name:item.title
                    });                   
                } else {
                    existingItem.quantity++;
                    existingItem.totalQuantity++;
                    existingItem.totalPrice = existingItem.totalPrice + item.price;
                }
                state.totalAmount = state.items.reduce((prev,next ) => prev + next.totalPrice, 0)
            },
            removeItemFromCart(state, action){
                const id = action.payload;
                const existingItem = state.items.find(cartItem => cartItem.id === id);
                state.changed = true;
                state.totalQuantity--;
                if(existingItem.quantity === 1) {
                    console.log(state.items, 'before');
                    state.items = state.items.filter(cartItem => cartItem.id !== id);
                    console.log(state.items, 'after');
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
                }
                state.totalAmount = state.items.reduce((prev,next ) => prev + next.totalPrice, 0)

            }
        }
})

export const cartActions = cartSlice.actions;
export default cartSlice;