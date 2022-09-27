import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./actions";

import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of the case,
    // return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      }

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

    // if it's none of these actions, do not update state
    default:
      return state;
  }
};

// useProductReducer() will help initialize global state object
// provides functionality for updating state by automatically
// running through the custom reducer() function. 
// BASICALLY a more in-depth way of using useState hook
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}
