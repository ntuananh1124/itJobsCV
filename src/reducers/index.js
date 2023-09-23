import CheckLogin from "./CheckLogin";
import CheckChangeField from "./CheckChangeField";
import { combineReducers } from "redux"

const allReducers = combineReducers({
    CheckLogin,
    CheckChangeField,
});

export default allReducers