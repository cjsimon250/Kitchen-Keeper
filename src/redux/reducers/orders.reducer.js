import { combineReducers } from "redux";

const orders = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return action.payload;
    default:
      return state;
  }
};

const selectedOrder = (
  state = {
    id: null,
    supplier: "",
    date: "",
    orderDetails: [""],
  },
  action
) => {
  switch (action.type) {
    case "SET_SELECTED_ORDER":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ orders, selectedOrder });
