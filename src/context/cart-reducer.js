export const sumItems = cartItems => {
    return {
        itemCount: cartItems.reduce((total, prod) => total + prod.quantity , 0),
        total: cartItems.reduce((total, prod) => total + (prod.price * prod.quantity), 0)
    }
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            if(!state.cartItems.find(item => item.id === action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1
                })
            }
            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }   
        case 'REMOVE_ITEM':
            const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                cartItems: [...newCartItems],
                ...sumItems(newCartItems)
            }
        case 'INCREASE':
            const increaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems[increaseIndex].quantity++;
            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems)
            }
        case 'DECREASE':
            const decreaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            state.cartItems[decreaseIndex].quantity--;
            return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems),
            }
        case 'ADD_BONUS_ITEM':
            const bonusItem = {
                id: action.payload._id,
                item: action.payload.name,
                quantity: 1,
                price: 0
            }
        return {
                ...state,
                cartItems: [...state.cartItems],
                ...sumItems(state.cartItems),
                bonusItem
            }   
        default:
                return state;
    }
}
export default cartReducer;