const initState = {
    isLoading: false,
    success: false,
    error: false,
    errorMessage: '',
    madeAppointments: [],
    todaysAppointments: []
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
                isLoading: false
            }

        case "SET_APPOINTMENTS_FAILURE":
            return {
                ...state,
                error: true,
                errorMessage: action.payload,
                isLoading: false
            }

        case "SET_APPOINTMENTS":
            initState.appointments = action.payload
            return {
                ...state,
                appointments: action.payload
            }

        case "SET_TODAYS_APPOINTMENTS":
            initState.todaysAppointments = action.payload
            return {
                ...state,
                todaysAppointments: action.payload
            }

        case "SET_MADE_APPOINTMENTS":
            initState.madeAppointments = action.payload
            return {
                ...state,
                madeAppointments: action.payload
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