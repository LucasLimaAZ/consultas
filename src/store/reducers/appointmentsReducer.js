const initState = {
    isLoading: false,
    success: false
}

const appointmentsReducer = (state = initState, action) => {

    switch (action.type) {

        case "TOGGLE_APPOINTMENTS_LOADER":
            return {
                ...state,
                isLoading: true
            }

        case "SET_APPOINTMENTS_SUCCESS":
            console.log("AUEBA reducer")
            return {
                success: true,
                isLoading: false
            }

        case "SET_APPOINTMENTS_FAILURE":
            return {
                success: false,
                isLoading: false
            }

        case "SET_APPOINTMENTS":
            initState.appointments = action.payload
            return {
                appointments: action.payload
            }

        case "DELETE_APPOINTMENT":
            let remainingAppointments = state.appointments.filter(patient => {
                return patient.id != action.payload.id
            })
            initState.appointments = remainingAppointments
            return {
                appointments: remainingAppointments,
                status: action.payload.jsonResponse.status
            }

        default:
            return state
    }

}

export default appointmentsReducer