export const filterPatients = patient => ({
    type: "FILTER_PATIENTS_SAGA",
    payload: patient
})

export const fetchPatients = page => ({
    type: "FETCH_PATIENTS_SAGA",
    payload: page
})

export const fetchAllPatients = () => ({
    type: "FETCH_ALL_PATIENTS_SAGA"
})

export const fetchPatientInfo = id => ({
    type: "FETCH_PATIENT_INFO_SAGA",
    payload: id
})

export const fetchPatientAppointments = id => ({
    type: "FETCH_PATIENT_APPOINTMENTS_SAGA",
    payload: id
})

export const deletePatient = id => ({
    type: "DELETE_PATIENT_SAGA",
    payload: id
})