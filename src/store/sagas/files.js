import { put, call } from 'redux-saga/effects'
import filesService from '../../services/filesService'

export function* upload(action){

    yield put({
        type: "TOGGLE_FILES_LOADER"
    })

    let jsonResponse = yield call(filesService.upload, action.payload)

    if(jsonResponse.status === 200){
        yield put({
            type: "SET_FILES_SUCCESS"
        })
    }else{
        yield put({
            type: "SET_FILES_FAILURE"
        })
    }
    
}

export function* fetchFiles(){

    let jsonResponse = yield call(filesService.fetchAll)

    yield put({
        type: "SET_FILES",
        payload: jsonResponse.data
    })

}