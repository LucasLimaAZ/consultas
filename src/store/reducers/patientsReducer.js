const initState = {}

const patientsReducer = (state = {}, action) => {

    switch(action.type){

        case "FILTER_PATIENTS":
            let filteredPatients = initState.patients.filter(patient => {
                let name = patient.name.toLocaleLowerCase()
                return name.includes(action.payload.toLocaleLowerCase())
            })
            return {
                ...state,
                patients: filteredPatients
            }

        case "SET_PATIENTS":
            console.log("setando patients: ", action.payload)
            initState.patients = action.payload
            return {
                ...state,
                patients: action.payload
            }

        case "SET_PAGINATION_DATA":
            return {
                ...state,
                paginationData: action.payload
            }

        case "DELETE_PATIENT":
            let remainingPatients = state.patients.filter(patient => {
                return patient.id != action.payload.id
            })
            initState.patients = remainingPatients
            return {
                ...state,
                patients: remainingPatients,
                status: action.payload.jsonResponse.status
            }
            
        default: return state
    }

}

export default patientsReducer