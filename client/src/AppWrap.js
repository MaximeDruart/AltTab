import React from "react"
import "./main.scss"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import WebSocketProvider from "./WebSocketContext"

import store from "./redux/configureStore"
import App from "./App"

const AppWrap = () => (
  <Provider store={store}>
    <Router>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </Router>
  </Provider>
)

export default AppWrap
