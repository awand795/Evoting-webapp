import { useState } from 'react'
import './styles.css'
import './styles2.css'
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import Notfound from './Components/Notfound'
import DashboardUser from './Components/Pages/User/DashboardUser'
import DashboardKandidat from './Components/Pages/DashboardKandidat';
import VotePage from './Components/Pages/VotePage'
import QuickCount from './Components/Pages/QuickCount';
import Report from './Components/Pages/Report';
import ManagementUser from './Components/Pages/ManagementUser';
import Settings from './Components/Pages/Settings';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/manajemenuser" element={<DashboardUser/>}/>
        <Route path="/manajemenkandidat" element={<DashboardKandidat/>}/>
        <Route path="/suarapemilih" element={<VotePage/>}/>
        <Route path="/quickcount" element={<QuickCount/>}/>
        <Route path="/laporan" element={<Report/>}/>
        <Route path="/usermanagement" element={<ManagementUser/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </div>
  )
}

export default App
