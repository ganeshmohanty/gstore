import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  //cartitems = [{cartitem},{cartitem} .......]
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      //check if the product already in cart
      const existItem = state.cartItems.find((i) => i.product === item.product);
      //if exist replace that else return a new updated cart
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    default:
      return state;
  }
};
