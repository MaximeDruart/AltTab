import { combineReducers } from "redux"
import interfaceReducer from "./interfaceReducer"

export default combineReducers({
  interface: interfaceReducer,
})
