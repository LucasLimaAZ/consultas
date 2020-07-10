import { takeEvery, all } from 'redux-saga/effects'
import * as patientsSagas from './patients'

export function* watchSagas(){
    yield all([
        yield takeEvery("FETCH_PATIENTS_SAGA", patientsSagas.fetchAll),
    ])
}