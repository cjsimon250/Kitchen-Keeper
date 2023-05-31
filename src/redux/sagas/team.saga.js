import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//WATCHER FUNCTION
function* teamSaga() {
  yield takeEvery("FETCH_TEAM", fetchTeam);
  yield takeEvery("POST_TEAM", postTeam);
}

//GET menu
function* fetchTeam() {
  try {
    const response = yield axios.get("/api/team");
    yield put({ type: "SET_TEAM", payload: response.data });
  } catch (error) {
    console.log("error in fetchTeam", error);
  }
}

//POST to menu
function* postTeam(action) {
  try {
    yield axios.post("/api/team", action.payload);
    yield put({ type: "FETCH_TEAM" });
  } catch (error) {
    console.log("Error in postTeam", error);
  }
}

export default teamSaga;
