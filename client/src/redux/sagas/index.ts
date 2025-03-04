import {all} from "redux-saga/effects"
import {authorsSagaWatcher} from "./authorSaga";
import {usersSagaWatcher} from "./userSaga";
import { bookSagaWatcher } from "./bookSaga";

export function* rootWatcher() {
    yield all([authorsSagaWatcher(), usersSagaWatcher(), bookSagaWatcher()])
}