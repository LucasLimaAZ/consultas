import { takeEvery, all } from 'redux-saga/effects'

import * as patientsSagas from './patients'

export function* watchSagas(){
    yield all([
        takeEvery("FETCH_PATIENTS", patientsSagas.fetchAll),
    ])
}