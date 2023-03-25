import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//WATCHER FUNCTION
function* notificationsSaga() {
  yield takeEvery("FETCH_NOTIFICATIONS", fetchNotifications);
}

//GET notifications
function* fetchNotifications() {
  try {
    const response = yield axios.get("/api/notifications");
    yield put({ type: "SET_NOTIFICATIONS", payload: response.data });
  } catch (error) {
    console.log("error in fetchNotifications", error);
  }
}

export default notificationsSaga;
