import { takeEvery, all } from 'redux-saga/effects'
import * as patientsSagas from './patients'
import * as appointmentsSagas from './appointments'
import * as filesSagas from './files'

export function* watchSagas(){
    yield all([
        takeEvery("FETCH_PATIENTS_SAGA", patientsSagas.fetchPatients),
        takeEvery("FETCH_ALL_PATIENTS_SAGA", patientsSagas.fetchAll),
        takeEvery("DELETE_PATIENT_SAGA", patientsSagas.deletePatient),
        takeEvery("STORE_APPOINTMENTS_SAGA", appointmentsSagas.storeAppointment),
        takeEvery("UPDATE_APPOINTMENTS_SAGA", appointmentsSagas.updateAppointment),
        takeEvery("DELETE_APPOINTMENT_SAGA", appointmentsSagas.deleteAppointment),
        takeEvery("FETCH_ALL_APPOINTMENTS_SAGA", appointmentsSagas.fetchAll),
        takeEvery("UPLOAD_FILES", filesSagas.upload),
        takeEvery("FETCH_FILES", filesSagas.fetchFiles),
        takeEvery("FETCH_FILES_BY_PATIENT", filesSagas.fetchByPatient)
    ])
}