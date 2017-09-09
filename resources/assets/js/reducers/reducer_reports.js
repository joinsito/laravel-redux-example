import _ from "lodash";
import { FETCH_REPORTS, FETCH_REPORT, EDIT_REPORT } from "../actions";

const INITIAL_STATE = { all: [], report: null };


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_REPORTS:
            return { ...state, all: _.mapKeys(action.payload.data.reports, "id") };
        case FETCH_REPORT:
            return { ...state, report: action.payload.data.report };
        case EDIT_REPORT:
            return { ...state, report: action.payload.data.report };
        default:
            return state;
    }
}