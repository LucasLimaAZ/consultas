export const storeAppointments = data => ({
    type: "STORE_APPOINTMENTS_SAGA",
    payload: data
})

export const updateAppointments = data => ({
    type: "UPDATE_APPOINTMENTS_SAGA",
    payload: data
})

export const fetchTodaysAppointments = () => ({
    type: "FETCH_TODAYS_APPOINTMENTS_SAGA"
})

export const fetchMadeAppointments = () => ({
    type: "FETCH_MADE_APPOINTMENTS_SAGA"
})

export const fetchAllAppointments = () => ({
    type: "FETCH_ALL_APPOINTMENTS_SAGA"
})

export const deleteAppointment = id => ({
    type: "DELETE_APPOINTMENT_SAGA",
    payload: id
})