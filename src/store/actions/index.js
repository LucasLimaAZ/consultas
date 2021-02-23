export { setPageTitle } from "./page";

export {
	storePatient,
	filterPatients,
	fetchPatients,
	fetchAllPatients,
	fetchPatientInfo,
	fetchPatientAppointments,
	deletePatient,
	fetchCep
} from "./patients";

export {
	storeAppointments,
	fetchAppointments,
	deleteAppointment,
	updateAppointments,
	fetchMadeAppointments,
	fetchTodaysAppointments,
} from "./appointments";

export {
	setSelectedFiles,
	uploadFiles,
	fetchFiles,
	fetchFilesByPatient,
} from "./files";
