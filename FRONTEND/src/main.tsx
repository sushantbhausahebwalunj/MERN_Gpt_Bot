import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme,ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import axios from 'axios' //axios package is used connecting fronted with backend
// axios.defaults.baseURL = "http://localhost:5000/api/v1" // here to pass our base url as the main url  of our api server 
axios.defaults.baseURL= `http://merngptbot-production.up.railway.app`
axios.defaults.withCredentials = true //withCredential is use to exchange the cookie  information between client and server 

const theme = createTheme({typography:{fontFamily:'Roboto Slab, serif', allVariants:{color:"white"},}})//this is provided by mui
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
   <ThemeProvider theme={theme}>
    <Toaster position='top-right'/>
    <App/>
   </ThemeProvider>
   </BrowserRouter>
   </AuthProvider>
  </React.StrictMode>,
)
