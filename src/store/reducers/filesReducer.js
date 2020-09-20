const initFiles = {
    files: [{
        teste: "teste1"
    }]
}

const filesReducer = (state = initFiles, action) => {

    switch (action.type) {

        case "SET_SELECTED_FILES":
            return {
                files: action.payload
            }

        default:
            return state
    }

}

export default filesReducer