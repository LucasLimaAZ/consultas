const initState = {
    currentPatient: {teste: "teste"},
    patients: [],
    paginationData: [],
    loader: false
}

const patientsReducer = (state = {}, action) => {

    switch(action.type){

        case "SET_LOADER":
            return {
                ...state,
                loader: true
            }

        case "SET_PATIENTS":
            initState.patients = action.payload
            return {
                ...state,
                patients: action.payload,
                loader: false
            }

        case "SET_PATIENT":
            return {
                ...state,
                patient: action.payload,
                loader: false
            }

        case "SET_PATIENT_APPOINTMENTS":
            return {
                ...state,
                appointments: action.payload,
                loader: false
            }

        case "SET_PAGINATION_DATA":
            return {
                ...state,
                paginationData: action.payload,
                loader: false
            }

        case "SET_CURRENT_PATIENT":
            return {
                ...state,
                currentPatient: action.payload,
                loader: false
            }

        case "DELETE_PATIENT":
            let remainingPatients = state.patients.filter(patient => {
                return patient.id != action.payload.id
            })
            initState.patients = remainingPatients
            return {
                ...state,
                patients: remainingPatients,
                status: action.payload.jsonResponse.status,
                loader: false
            }
            
        default: return state
    }

}

export default patientsReducer