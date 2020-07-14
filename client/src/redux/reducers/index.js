import { combineReducers } from "redux"
import interfaceReducer from "./interfaceReducer"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"
import socketReducer from "./socketReducer"

export default combineReducers({
  interface: interfaceReducer,
  auth: authReducer,
  error: errorReducer,
  socket: socketReducer,
})
