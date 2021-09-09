import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((i) => i.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItem.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};
