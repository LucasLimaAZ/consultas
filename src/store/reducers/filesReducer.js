const initFiles = {
    loader: true
}

const filesReducer = (state = initFiles, action) => {

    switch (action.type) {

        case "SET_SELECTED_FILES":
            return {
                ...state,
                selectedFiles: action.payload
            }

        case "SET_LOADER": 
            return {
                ...state,
                loader: true
            }

        case "SET_FILES":
            return {
                ...state,
                files: action.payload,
                loader: false
            }

        default:
            return state
    }

}

export default filesReducer