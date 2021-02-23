import { put, call } from 'redux-saga/effects'
import appointmentsService from '../../services/appointmentsService'

export function* storeAppointment(action) {

    yield put({ type: "SET_LOADER" })

    try {
        yield call(appointmentsService.store, action.payload)
        yield put({
            type: "SET_SUCCESS",
            payload: "Atendimento cadastrado com sucesso!"
        })
    }
    catch (err) {
        yield put({
            type: "SET_FAILURE",
            payload: "Ocorreu um erro ao cadastrar o atendimento."
        })
    }

}

export function* updateAppointment(action) {

    yield put({ type: "SET_LOADER" })

    try {
        yield call(appointmentsService.update, action.payload)
        yield put({
            type: "SET_SUCCESS",
            payload: "Atendimento atualizado com sucesso!"
        })
    }
    catch (err) {
        yield put({
            type: "SET_FAILURE",
            payload: "Ocorreu um erro ao atualizar o atendimento."
        })
    }

}

export function* fetchAll(action) {
    yield put({ type: "SET_APPOINTMENTS_LOADER" })

    let jsonResponse = yield call(appointmentsService.fetchAll, action.payload)

    yield put({
        type: "SET_APPOINTMENTS",
        payload: jsonResponse.data.data
    })

    yield put({
        type: "SET_APPOINTMENTS_PAGINATION_DATA",
        payload: jsonResponse.data
    })
}

export function* fetchMadeAppointments() {
    let jsonResponse = yield call(appointmentsService.fetchMade)

    yield put({
        type: "SET_MADE_APPOINTMENTS",
        payload: jsonResponse.data
    })
}

export function* fetchTodaysAppointments() {
    let jsonResponse = yield call(appointmentsService.fetchTodays)

    yield put({
        type: "SET_TODAYS_APPOINTMENTS",
        payload: jsonResponse.data
    })
}

export function* deleteAppointment(action) {
    let jsonResponse = yield call(appointmentsService.deleteAppointment, action.payload)
    
    yield put({
        type: "DELETE_APPOINTMENT",
        payload: { jsonResponse: jsonResponse, id: action.payload }
    })
}