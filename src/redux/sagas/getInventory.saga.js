import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//WATCHER FUNCTION
function* getInventorySaga() {
  yield takeEvery("FETCH_INVENTORY", fetchInventory);
}

function* fetchInventory() {
  try {
    const response = yield axios.get("/api/inventory");
    yield put({ type: "SET_INVENTORY", payload: response.data });
  } catch (error) {
    console.log("error in fetchInventory", error);
  }
}
