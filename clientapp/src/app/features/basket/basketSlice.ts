import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Basket } from "../../models/basket";


interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error: any) {
            console.log(error);
        }
    }
)

export const basketSlice = createSlice({
    name:'basket',
    initialState,
    reducers:{
        setBasket:(state,action)=>{
            state.basket=action.payload;
        },
        removeItem:(state,action)=>{
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0) 
                state.basket.items.splice(itemIndex, 1);
        }
    }
})

export const {setBasket,removeItem} = basketSlice.actions; 
