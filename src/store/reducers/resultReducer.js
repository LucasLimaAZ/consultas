import { SuccessModal, ErrorModal } from '../../components/Modal/modal'

const initState = {
    loader: false,
    success: false,
    error: false,
    message: ""
}

const resultReducer = (state = initState, action) => {
    switch (action.type){
        case "SET_LOADER":
            return {
                ...state,
                loader: true
            }

        case "DISMISS_LOADER":
            return {
                ...state,
                loader: false
            }

        case "SET_SUCCESS":
            SuccessModal(action.payload)
            return {
                loader: false,
                success: true,
                error: false,
                message: action.payload
            }

        case "SET_FAILURE":
            ErrorModal(action.payload)
            return {
                loader: false,
                success: false,
                error: true,
                message: action.payload
            }

        default:
            return state
    }
}

export default resultReducer