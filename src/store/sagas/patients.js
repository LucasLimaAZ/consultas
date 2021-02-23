import { put, call } from 'redux-saga/effects'
import patientsService from '../../services/patientsService'
import cepService from '../../services/cepService'

export function* storePatient(action){

    yield put({ type: "SET_LOADER" })

    try {
        yield call(patientsService.store, action.payload)
        yield put({ 
            type: "SET_SUCCESS", 
            payload: "Paciente cadastrado com sucesso!"
        })
    } 
    catch (err) {
        if(err.message === "Request failed with status code 422") {
            yield put({ 
                type: "SET_FAILURE", 
                payload: "Email já cadastrado."
            })
        }
        else {
            yield put({ 
                type: "SET_FAILURE", 
                payload: "Ocorreu um erro ao cadastrar o paciente."
            })
        }
    }

}

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

export function* fetchPatientInfo(action){

    let jsonResponse = yield call(patientsService.find, action.payload)

    yield put({
        type: "SET_CURRENT_PATIENT",
        payload: jsonResponse.data
    })
}

export function* fetchCep(action){
    
    yield put({ type: "SET_LOADER" })

    try{
        let jsonResponse = yield call(cepService.fetch, action.payload)
        yield put({
            type: "SET_CEP",
            payload: jsonResponse
        })
    }
    catch (err) {
        yield put({ type: "DISMISS_LOADER" })
        console.error(err)
    }
}

export function* fetchAll(){
    let jsonResponse = yield call(patientsService.fetchAll)

    yield put({
        type: "SET_PATIENTS",
        payload: jsonResponse.data
    })
}

export function* fetchAppointments(action){
    let jsonResponse = yield call(patientsService.fetchAppointments, action.payload)

    yield put({
        type: "SET_PATIENT_APPOINTMENTS",
        payload: jsonResponse.data
    })
}

export function* filter(action){

    let jsonResponse = yield call(patientsService.filter, action.payload)

    yield put({
        type: "SET_PAGINATION_DATA",
        payload: jsonResponse.data
    })

    yield put({
        type: "SET_PATIENTS",
        payload: jsonResponse.data.data
    })
}

export function* find(action){
    let jsonResponse = yield call(patientsService.find, action.payload)

    yield put({
        type: "SET_PATIENT",
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