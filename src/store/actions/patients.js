export const filterPatients = patient => ({
    type: "FILTER_PATIENTS",
    payload: patient
})

export const fetchPatients = () => ({
    type: "FETCH_PATIENTS_SAGA"
})

export const deletePatient = id => ({
    type: "DELETE_PATIENT_SAGA",
    payload: id
})