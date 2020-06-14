import { DELETE_PRODUCT_BASKET } from "./types";

export const deleteBasket = (product) => {
  return (dispatch) => {
    console.log(product);
    dispatch({
      type: DELETE_PRODUCT_BASKET,
      payload: product,
    });
  };
};
