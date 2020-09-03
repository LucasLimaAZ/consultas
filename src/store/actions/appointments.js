export const storeAppointments = data => ({
    type: "STORE_APPOINTMENTS_SAGA",
    payload: data
})

export const fetchAllAppointments = () => ({
    type: "FETCH_ALL_APPOINTMENTS_SAGA"
})

export const deleteAppointment = id => ({
    type: "DELETE_APPOINTMENT_SAGA",
    payload: id
})