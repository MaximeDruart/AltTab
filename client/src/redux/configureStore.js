import { createStore } from "redux"
import rootReducer from "./reducers"
import { applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

const devToolsStore = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

const store = createStore(rootReducer, applyMiddleware(thunk))

export default window.__REDUX_DEVTOOLS_EXTENSION__ ? devToolsStore : store
