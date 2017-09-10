import _ from "lodash";
import { FETCH_PATIENTS, CREATE_PATIENT, FETCH_PATIENT, EDIT_PATIENT } from "../actions";

const INITIAL_STATE = { all: [], patient: null };


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            return { ...state, all: _.mapKeys(action.payload.data.patients, "id") };
        case CREATE_PATIENT:
            return { ...state, patient: action.payload.data.patient };
        case EDIT_PATIENT:
            return { ...state, patient: action.payload.data.patient };
        case FETCH_PATIENT:
            return { ...state, patient: action.payload.data.patient };
        default:
            return state;
    }
}