import { combineReducers } from 'redux'
import pageReducer from './pageReducer'
import patientsReducer from './patientsReducer'
import appointmentsReducer from './appointmentsReducer'
import filesReducer from './filesReducer'
import resultReducer from './resultReducer'

export default combineReducers ({
    filesReducer,
    pageReducer,
    patientsReducer,
    appointmentsReducer,
    resultReducer
})