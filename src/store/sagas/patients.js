import { put, call } from 'redux-saga/effects'
import patientsService from '../../services/patientsService'

export function* fetchAll(){
    let jsonResponse = yield call(patientsService.fetchAll())
    yield put({
        type: "SET_PATIENTS",
        payload: jsonResponse
    })
}