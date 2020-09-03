import { combineReducers } from 'redux'
import pageReducer from './pageReducer'
import patientsReducer from './patientsReducer'
import appointmentsReducer from './appointmentsReducer'

export default combineReducers ({
    pageReducer,
    patientsReducer,
    appointmentsReducer
})