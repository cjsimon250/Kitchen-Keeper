import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//WATCHER FUNCTION
function* menuSaga() {
  yield takeEvery("FETCH_MENU", fetchMenu);
  yield takeEvery("POST_MENU", postMenu);
}

//GET inventory
function* fetchMenu() {
  try {
    const response = yield axios.get("/api/menu");
    yield put({ type: "SET_MENU", payload: response.data });
  } catch (error) {
    console.log("error in fetchMenu", error);
  }
}

//POST to inventory
function* postMenu(action) {
  try {
    yield axios.post("/api/menu", action.payload);
    yield put({ type: "FETCH_MENU" });
  } catch (error) {
    console.log("Error in postMenu", error);
  }
}

export default menuSaga;
