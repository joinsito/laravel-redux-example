import _ from "lodash";
import { FETCH_REPORTS, FETCH_REPORT, EDIT_REPORT, DELETE_REPORT } from "../actions";

const INITIAL_STATE = { all: [], report: null };


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REPORTS:
            const admin = action.payload.data.reports.admin;
            delete(action.payload.data.reports.admin);
            return { ...state, all: _.mapKeys(action.payload.data.reports, "id"), admin: admin };
        case FETCH_REPORT:
            return { ...state, report: action.payload.data.report };
        case EDIT_REPORT:
            return { ...state, report: action.payload.data.report };
        case DELETE_REPORT:
            return { ...state, all: action.payload.data.reports };
        default:
            return state;
    }
}