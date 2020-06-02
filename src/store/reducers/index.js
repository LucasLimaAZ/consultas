import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import patientsReducer from './patientsReducer';

export default combineReducers ({
    pageReducer,
    patientsReducer
});