import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//WATCHER FUNCTION
function* ordersSaga() {
  yield takeEvery("FETCH_ORDERS", fetchOrders);
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

export default ordersSaga;
