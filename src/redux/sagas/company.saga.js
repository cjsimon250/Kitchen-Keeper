import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_COMPANY" actions
function* fetchCompany() {
  try {
    const response = yield axios.get("api/company");
    yield put({ type: "SET_COMPANY", payload: response.data });
  } catch (error) {
    console.log("Error fetching user company", error);
  }
}

function* companySaga() {
  yield takeLatest("FETCH_COMPANY", fetchCompany);
}

export default companySaga;
