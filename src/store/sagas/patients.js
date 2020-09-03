import { put, call } from 'redux-saga/effects'
import patientsService from '../../services/patientsService'

export function* fetchPatients(){
    let jsonResponse = yield call(patientsService.fetch)
    yield put({
        type: "SET_PATIENTS",
        payload: jsonResponse.data.data
    })
}

export function* fetchAll(){
    let jsonResponse = yield call(patientsService.fetchAll)
    yield put({
        type: "SET_PATIENTS",
        payload: jsonResponse.data
    })
}

export function* deletePatient(action){
    let jsonResponse = yield call(patientsService.deletePatient, action.payload)
    yield put({
        type: "DELETE_PATIENT",
        payload: {jsonResponse: jsonResponse, id: action.payload}
    })
}