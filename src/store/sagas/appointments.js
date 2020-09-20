import { put, call } from 'redux-saga/effects'
import appointmentsService from '../../services/appointmentsService'

export function* storeAppointment(action){

    yield put({
        type: "TOGGLE_APPOINTMENTS_LOADER"
    })

    let jsonResponse = yield call(appointmentsService.store, action.payload)

    if(jsonResponse.status === 200){
        yield put({
            type: "SET_APPOINTMENTS_SUCCESS"
        })
    }else{
        yield put({
            type: "SET_APPOINTMENTS_FAILURE"
        })
    }
    
}

export function* fetchAll(){
    let jsonResponse = yield call(appointmentsService.fetchAll)
    yield put({
        type: "SET_APPOINTMENTS",
        payload: jsonResponse.data.data
    })
}

export function* deleteAppointment(action){
    let jsonResponse = yield call(appointmentsService.deleteAppointment, action.payload)
    yield put({
        type: "DELETE_APPOINTMENT",
        payload: {jsonResponse: jsonResponse, id: action.payload}
    })
}