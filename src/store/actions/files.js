export const setSelectedFiles = selectedFiles => ({
    type: "SET_SELECTED_FILES",
    payload: selectedFiles
})

export const uploadFiles = files => ({
    type: "UPLOAD_FILES",
    payload: files
})

export const fetchFiles = page => ({
    type: "FETCH_FILES",
    payload: page
})