const initState = {
    patients: [{
        name: "Fabrício Machado",
        login: "fab_m89",
        value: "R$ 199,00"
    },
    {
        name: "Janaina Pinto",
        login: "janaina78",
        value: "R$ 199,00"
    },
    {
        name: "Ronaldo Cruz",
        login: "cruzRonaldo",
        value: "R$ 179,00"
    },
    {
        name: "Clóvis Pereira",
        login: "gremio123",
        value: "R$ 199,00"
    },
    {
        name: "João Seller",
        login: "joaoRJ",
        value: "R$ 219,00"
    },
    {
        name: "Márcia Müller",
        login: "marcinha1991",
        value: "R$ 140,00"
    }]
}

const patientsReducer = (state = initState, action) => {

    switch(action.type){

        case "FILTER_PATIENTS":

            state = initState;
            let filteredPatients = state.patients.filter(patient => {
                let name = patient.name.toLocaleLowerCase();
                return name.includes(action.payload.toLocaleLowerCase());
            });
            return {
                patients: filteredPatients
            };
            
        default: return state;
    }

}

export default patientsReducer;