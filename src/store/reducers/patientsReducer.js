const patientsReducer = (state = {}, action) => {

    switch(action.type){

        case "FILTER_PATIENTS":
            let filteredPatients = state.patients.filter(patient => {
                let name = patient.name.toLocaleLowerCase()
                return name.includes(action.payload.toLocaleLowerCase())
            })
            return {
                patients: filteredPatients
            }

        case "SET_PATIENTS":
            return {
                patients: action.payload
            }
            
        default: return state
    }

}

export default patientsReducer