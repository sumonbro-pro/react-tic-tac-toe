import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/style.css'


function MyComp () {
  return(
    <App/> 
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyComp />
  </React.StrictMode>,
)
