import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import companySaga from "./company.saga";
import userSaga from "./user.saga";
import inventorySaga from "./inventory.saga";
import menuSaga from "./menu.saga";
import ordersSaga from "./orders.saga";
import salesSaga from "./sales.saga";
import notificationsSaga from "./notifications.saga";
import teamSaga from "./team.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    inventorySaga(),
    menuSaga(),
    companySaga(),
    ordersSaga(),
    salesSaga(),
    notificationsSaga(),
    teamSaga(),
  ]);
}
