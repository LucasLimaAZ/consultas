const initFiles = {
    files: [],
    selectedFiles: []
}

const filesReducer = (state = initFiles, action) => {

    switch (action.type) {

        case "SET_SELECTED_FILES":
            return {
                ...state,
                selectedFiles: action.payload
            }

        case "SET_FILES":
            return {
                ...state,
                files: action.payload
            }

        default:
            return state
    }

}

export default filesReducer