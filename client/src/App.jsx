import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegiserPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { useEffect } from 'react'
import AccountPage from './pages/AccountPage'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  

  return (
    <UserContextProvider>
      <Routes>
        <Route path-="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegiserPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />

          {/* <Route path='/account/bookings' element={<AccountPage />} />
          <Route path='/account/places' element={<AccountPage />} /> */}

        </Route>
      </Routes >
    </UserContextProvider>

  )
}

export default App
