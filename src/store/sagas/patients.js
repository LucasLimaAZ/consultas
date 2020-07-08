import { put, call } from 'redux-saga/effects'
import patientsService from '../../services/patientsService'

export function* fetchAll(){
    yield patientsService.fetchAll()
}