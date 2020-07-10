export const filterPatients = patient => ({
    type: "FILTER_PATIENTS",
    payload: patient
})

export const fetchPatients = () => ({
    type: "FETCH_PATIENTS_SAGA"
})