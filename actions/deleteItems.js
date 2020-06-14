import {DELETE_ITEMS_BASKET} from './types';

export const deleteItems = (product) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEMS_BASKET,
      payload: product,
    });
  };
};
