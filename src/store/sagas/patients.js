import { put, call } from 'redux-saga/effects'
import patientsService from '../../services/patientsService'

export function* fetchPatients(action){
    let jsonResponse = yield call(patientsService.fetch, action.payload)

    yield put({
        type: "SET_PAGINATION_DATA",
        payload: jsonResponse.data
    })

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