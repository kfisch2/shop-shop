import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  // when we use this component, it immediately calls upon the useStoreContext() hook to retrieve current state
  // from the global state object and the dispatch method to update state
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { data: categoryData, loading } = useQuery(QUERY_CATEGORIES);

  // useEffect is a function that takes two args: a function to run given a condition, then the condition.
  // when useQuery finishes then useEffect() knows to run again when it notices the state changes

  // useEffect allows us to get updated data that returns from teh useQuery() hook and dispatch method
  // useQuery() is an async function so we don't get the data we need as it doesn't exist on load
  useEffect(() => {
    // if categoryData exists or has changed from the res. of useQuery, then run dispatch
    if (categoryData) {
      // execute dispatch function with action object indicating type of action and data to set our state for categories
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });

      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      })
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        })
      })
    }
  }, [categoryData, dispatch, loading]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
