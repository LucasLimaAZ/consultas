import { combineReducers } from 'redux'
import pageReducer from './pageReducer'
import patientsReducer from './patientsReducer'
import appointmentsReducer from './appointmentsReducer'
import filesReducer from './filesReducer'

export default combineReducers ({
    filesReducer,
    pageReducer,
    patientsReducer,
    appointmentsReducer
})