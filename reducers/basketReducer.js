import {
  ADD_PRODUCT_BASKET,
  DELETE_PRODUCT_BASKET,
  DELETE_ITEMS_BASKET,
} from '../actions/types';

const initialState = {
  basketNumbers: 0,
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_BASKET:
      const {products} = state;
      const payloadProduct = action.payload;

      const productIndex = products.findIndex(
        (p) => p._id === payloadProduct._id,
      );
      if (productIndex >= 0) {
        const newProducts = [...products];
        state.basketNumbers = state.basketNumbers + 1;
        newProducts[productIndex].qty++;
        return {...state, products: newProducts};
      }
      return {
        basketNumbers: state.basketNumbers + 1,
        products: state.products.concat(action.payload),
      };
    case DELETE_PRODUCT_BASKET:
      const prods = state.products;
      const payloadProd = action.payload;
      const productInd = prods.findIndex((p) => p._id === payloadProd._id);

      if (productInd > 1) {
        const newProducts = [...prods];
        state.basketNumbers = state.basketNumbers - 1;
        newProducts[productInd].qty--;
        return {...state, products: newProducts};
      }
      return {
        ...state,
        basketNumbers: state.basketNumbers - 1,
      };
    case DELETE_ITEMS_BASKET:
      const payloadItem = action.payload;

      var filteredAry = state.products.filter((e) => e._id !== payloadItem._id);
      state.basketNumbers = state.basketNumbers - payloadItem.qty;
      state.products = filteredAry;
      return {
        ...state,
        products: filteredAry,
      };
    default:
      return state;
  }
};
