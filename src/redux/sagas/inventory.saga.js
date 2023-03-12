import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//WATCHER FUNCTION
function* inventorySaga() {
  yield takeEvery("FETCH_INVENTORY", fetchInventory);
  yield takeEvery("POST_INVENTORY", postInventory);
}

//GET inventory
function* fetchInventory() {
  try {
    const response = yield axios.get("/api/inventory");
    yield console.log(response.data);
    yield put({ type: "SET_INVENTORY", payload: response.data });
  } catch (error) {
    console.log("error in fetchInventory", error);
  }
}

//POST to inventory
function* postInventory(action) {
  try {
    yield axios.post("/api/inventory", action.payload);
    yield put({ type: "FETCH_INVENTORY" });
  } catch (error) {
    console.log("Error in postInventory", error);
  }
}

export default inventorySaga;
