import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import InverseProtected from './Components/InverseProtected/InverseProtected.jsx'







export default function App() {







  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path='signup' element={<InverseProtected><Register /></InverseProtected>} />
              <Route path='login' element={<InverseProtected><Login /></InverseProtected>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}