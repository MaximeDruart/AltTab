import { createStore } from "redux"
import rootReducer from "./reducers"
import { applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

let store

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

export default store
