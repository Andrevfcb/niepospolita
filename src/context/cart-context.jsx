import React, { createContext, useReducer } from 'react';
import cartReducer from './cart-reducer';

export const CartContext = createContext();

const initialState = { cartItems: [], itemCount: 0, total: 0, bonusItem: false, tip: false };

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const addProduct = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
    const removeProduct = (product) => dispatch({ type: 'REMOVE_ITEM', payload: product });
    const increase = (product) => dispatch({ type: 'INCREASE', payload: product });
    const decrease = (product) => dispatch({ type: 'DECREASE', payload: product });
    const addBonusItem = (product) => dispatch({ type: 'ADD_BONUS_ITEM', payload: product });
    const addTip = (product) => dispatch({ type: 'ADD_TIP', payload: product });
    const removeTip = () => dispatch({ type: 'REMOVE_TIP' });

    const contextValues = {
        ...state,
        addProduct,
        removeProduct,
        increase,
        decrease,
        addBonusItem,
        addTip,
        removeTip
    }
    return (
        <CartContext.Provider value={ contextValues }>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider;