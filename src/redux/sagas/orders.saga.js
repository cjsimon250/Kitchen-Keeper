import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//WATCHER FUNCTION
function* ordersSaga() {
  yield takeEvery("FETCH_ORDERS", fetchOrders);
  yield takeEvery("POST_ORDER", postOrder);
  yield takeEvery("DELETE_ORDER", deleteOrder);
}

//GET orders
function* fetchOrders() {
  try {
    const response = yield axios.get("/api/orders");
    yield put({ type: "SET_ORDERS", payload: response.data });
  } catch (error) {
    console.log("error in fetchOrders", error);
  }
}

//POST to orders
function* postOrder(action) {
  try {
    yield axios.post("/api/orders", action.payload);
    yield put({ type: "FETCH_ORDERS" });
  } catch (error) {
    console.log("Error in postOrders", error);
  }
}

//DELETE order
function* deleteOrder(action) {
  try {
    yield axios.delete(`/api/orders/${action.payload}`);
    yield put({ type: "FETCH_ORDERS" });
  } catch (error) {
    console.log("Error in deleteOrder", error);
  }
}

export default ordersSaga;
