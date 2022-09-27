// createContext used to instantiate new Context object --> creating a container to hold global state data functionality
// useContext is a React hook that allows us to use state created from createContext function
import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  // we instantiate initial global state with useProductReducer function
  // state = most up-to-date version of global state object
  // dispatch = method we exec. to udpate state. Looks for an action object passed in as an arg.
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
  });
  console.log(state);
  return <Provider value={[state, dispatch]} {...props}></Provider>;
};

// custom React hook
const useStoreContext = () => {
  return useContext(StoreContext);
}

export { StoreProvider, useStoreContext }