import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//WATCHER FUNCTION
function* salesSaga() {
  yield takeEvery("FETCH_SALES", fetchSales);
}

//GET sales
function* fetchSales(action) {
  try {
    const params = {
      minDate: action.payload.minDate,
      maxDate: action.payload.maxDate,
    };
    const response = yield axios.get(`/api/sales`, { params });
    yield put({ type: "SET_SALES_DATA", payload: response.data });
  } catch (error) {
    console.log("error in fetchOrders", error);
  }
}

export default salesSaga;
