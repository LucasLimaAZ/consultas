import { put, call } from 'redux-saga/effects'
import filesService from '../../services/filesService'

export function* upload(action){

    yield put({
        type: "TOGGLE_FILES_LOADER"
    })

    let jsonResponse = yield call(filesService.upload, action.payload.files)
    yield jsonResponse.data.forEach(file => console.log("Attaching ", file.id, " and ", action.payload.patient))
    yield jsonResponse.data.forEach(file => call(
        filesService.attach, 
        action.payload.patient, 
        file.id
    ))

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