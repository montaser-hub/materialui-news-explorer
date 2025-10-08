import { StrictMode } from 'react'
import { Provider } from "react-redux";
import  myStore   from "./Redux-Toolkit/Store";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myStore }>
      <App />
    </Provider>
  </StrictMode>,
)
