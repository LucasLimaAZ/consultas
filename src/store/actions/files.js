export const setSelectedFiles = selectedFiles => ({
    type: "SET_SELECTED_FILES",
    payload: selectedFiles
})

export const uploadFiles = (files, patient) => ({
    type: "UPLOAD_FILES",
    payload: {
        files: files,
        patient: patient
    }
})

export const fetchFiles = page => ({
    type: "FETCH_FILES",
    payload: page
})

export const fetchFilesByPatient = patient => ({
    type: "FETCH_FILES_BY_PATIENT",
    payload: patient
})