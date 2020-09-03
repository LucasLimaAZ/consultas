import { takeEvery, all } from 'redux-saga/effects'
import * as patientsSagas from './patients'
import * as appointmentsSagas from './appointments'

export function* watchSagas(){
    yield all([
        yield takeEvery("FETCH_PATIENTS_SAGA", patientsSagas.fetchPatients),
        yield takeEvery("FETCH_ALL_PATIENTS_SAGA", patientsSagas.fetchAll),
        yield takeEvery("DELETE_PATIENT_SAGA", patientsSagas.deletePatient),
        yield takeEvery("STORE_APPOINTMENTS_SAGA", appointmentsSagas.storeAppointment),
        yield takeEvery("FETCH_ALL_APPOINTMENTS_SAGA", appointmentsSagas.fetchAll)
    ])
}