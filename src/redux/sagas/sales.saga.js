import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//WATCHER FUNCTION
function* salesSaga() {
  yield takeEvery("FETCH_YEARS_SALES", fetchYearsSales);
  yield takeEvery("FETCH_WEEKS_SALES", fetchWeeksSales);
}

//GET year's sales
function* fetchYearsSales(action) {
  try {
    const params = {
      minDate: action.payload.minDate,
      maxDate: action.payload.maxDate,
    };
    const response = yield axios.get(`/api/sales/monthly`, { params });
    yield put({ type: "SET_YEARS_SALES_DATA", payload: response.data });
  } catch (error) {
    console.log("error in fetchYearsSales", error);
  }
}

//GET week's sales
function* fetchWeeksSales(action) {
  try {
    const params = {
      minDate: action.payload.minDate,
      maxDate: action.payload.maxDate,
    };
    const response = yield axios.get(`/api/sales/daily`, { params });
    yield put({ type: "SET_WEEKS_SALES_DATA", payload: response.data });
  } catch (error) {
    console.log("error in fetchWeeksSales", error);
  }
}

export default salesSaga;
