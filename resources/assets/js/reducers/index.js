import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ReportsReducer from "./reducer_reports";
import PatientsReducer from "./reducer_patients";

const rootReducer = combineReducers({
    reports: ReportsReducer,
    patients: PatientsReducer,
    form: formReducer
});

export default rootReducer;