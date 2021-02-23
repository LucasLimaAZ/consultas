import { takeLatest, all } from 'redux-saga/effects'
import * as patientsSagas from './patients'
import * as appointmentsSagas from './appointments'
import * as filesSagas from './files'

export function* watchSagas(){
    yield all([

        // PATIENTS
        takeLatest("STORE_PATIENT_SAGA", patientsSagas.storePatient),
        takeLatest("FETCH_PATIENTS_SAGA", patientsSagas.fetchPatients),
        takeLatest("FETCH_ALL_PATIENTS_SAGA", patientsSagas.fetchAll),
        takeLatest("FETCH_PATIENT_INFO_SAGA", patientsSagas.fetchPatientInfo),
        takeLatest("DELETE_PATIENT_SAGA", patientsSagas.deletePatient),
        takeLatest("FILTER_PATIENTS_SAGA", patientsSagas.filter),
        takeLatest("FETCH_PATIENT_APPOINTMENTS_SAGA", patientsSagas.fetchAppointments),
        takeLatest("FETCH_CEP_SAGA", patientsSagas.fetchCep),

        //  APPOINTMENTS
        takeLatest("FETCH_MADE_APPOINTMENTS_SAGA", appointmentsSagas.fetchMadeAppointments),
        takeLatest("FETCH_TODAYS_APPOINTMENTS_SAGA", appointmentsSagas.fetchTodaysAppointments),
        takeLatest("STORE_APPOINTMENTS_SAGA", appointmentsSagas.storeAppointment),
        takeLatest("UPDATE_APPOINTMENTS_SAGA", appointmentsSagas.updateAppointment),
        takeLatest("DELETE_APPOINTMENT_SAGA", appointmentsSagas.deleteAppointment),
        takeLatest("FETCH_ALL_APPOINTMENTS_SAGA", appointmentsSagas.fetchAll),

        //
        takeLatest("UPLOAD_FILES", filesSagas.upload),
        takeLatest("FETCH_FILES", filesSagas.fetchFiles),
        takeLatest("FETCH_FILES_BY_PATIENT", filesSagas.fetchByPatient)

    ])
}