import { combineReducers } from "redux"
import interfaceReducer from "./interfaceReducer"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"

export default combineReducers({
  interface: interfaceReducer,
  auth: authReducer,
  error: errorReducer,
})
