import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form"
import userReducer from "./userReducer"
import vehicleReducer from "./vehicleReducer"
import alertReducer from "./alertReducer";
import {LOGOUT } from "./../actions/types"


const appReducer= combineReducers({
form:formReducer,
user:userReducer,
parking:vehicleReducer,
alert:alertReducer
})
const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined
    }
  
    return appReducer(state, action)
  }
  
  export default rootReducer;