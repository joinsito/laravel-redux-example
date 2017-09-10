import axios from "axios";

export const FETCH_REPORTS = "fetch_reports";
export const FETCH_REPORT = 'fetch_report';
export const CREATE_REPORT = 'create_report';
export const EDIT_REPORT = 'edit_report';
<<<<<<< HEAD
export const DELETE_REPORT = 'delete_report';
=======
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771
export const FETCH_PATIENTS = "fetch_patients";
export const FETCH_PATIENT = "fetch_patient";
export const CREATE_PATIENT = "create_patient";
export const EDIT_PATIENT = "create_patient";
<<<<<<< HEAD
export const DELETE_PATIENT = 'delete_patient';
=======
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771



export function fetchReports() {
    const request = axios.get(`${APP_URL}/api/reports`);

    return {
        type: FETCH_REPORTS,
        payload: request
    };
}
export function fetchReport(id) {
    const request = axios.get(`${APP_URL}/api/report/${id}`);
    return {
        type: FETCH_REPORT,
        payload: request
    };
}

export function createReport(props) {
    const request = axios.post(`${APP_URL}/api/newreport`,props);
    return {
        type: CREATE_REPORT,
        payload: request
    };
}

export function editReport(id,props) {
    const request = axios.put(`${APP_URL}/api/editreport/${id}`,props);
    return {
        type: EDIT_REPORT,
        payload: request
    };
}
<<<<<<< HEAD
export function deleteReport(id) {
    const request = axios.delete(`${APP_URL}/api/deletereport/${id}`);
    return {
        type: DELETE_REPORT,
        payload: request
    };
}
=======
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771

// Patients methods
export function fetchPatients() {
    const request = axios.get(`${APP_URL}/api/patients`);

    return {
        type: FETCH_PATIENTS,
        payload: request
    };
}
// Patients methods
export function fetchPatient(id) {
    const request = axios.get(`${APP_URL}/api/patients/${id}`);

    return {
        type: FETCH_PATIENT,
        payload: request
    };
}

export function createPatient(props) {
    const request = axios.post(`${APP_URL}/api/newpatient`,props);
    return {
        type: CREATE_PATIENT,
        payload: request
    };
}

export function editPatient(id,props) {
    const request = axios.put(`${APP_URL}/api/editpatient/${id}`,props);
    return {
        type: EDIT_PATIENT,
        payload: request
    };
<<<<<<< HEAD
}
export function deletePatient(id) {
    const request = axios.delete(`${APP_URL}/api/deletepatient/${id}`);
    return {
        type: DELETE_PATIENT,
        payload: request
    };
=======
>>>>>>> cfd6cf5483203dbd042d4e23fe8b1703f314b771
}