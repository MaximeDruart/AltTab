import { createStore } from "redux"
import rootReducer from "./reducers"
import { applyMiddleware, compose } from "redux"
// import { applyMiddleware } from "redux"
import thunk from "redux-thunk"

// redux with redux devtools

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

// export default createStore(rootReducer, applyMiddleware(thunk))
