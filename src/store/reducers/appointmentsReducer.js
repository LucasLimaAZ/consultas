const initState = {
    isLoading: false,
    success: false,
    response: false
}

const appointmentsReducer = (state = initState, action) => {

    switch (action.type) {

        case "TOGGLE_APPOINTMENTS_LOADER":
            return {
                ...state,
                isLoading: true
            }

        case "SET_APPOINTMENTS_SUCCESS":
            return {
                ...state,
                success: true,
                isLoading: false,
                response: action.payload
            }

        case "SET_APPOINTMENTS_FAILURE":
            return {
                ...state,
                success: false,
                isLoading: false,
                response: action.payload
            }

        case "SET_APPOINTMENTS":
            initState.appointments = action.payload
            return {
                ...state,
                appointments: action.payload
            }

        case "DELETE_APPOINTMENT":
            let remainingAppointments = state.appointments.filter(patient => {
                return patient.id != action.payload.id
            })
            initState.appointments = remainingAppointments
            return {
                ...state,
                appointments: remainingAppointments,
                status: action.payload.jsonResponse.status
            }

        default:
            return state
    }

}

export default appointmentsReducer