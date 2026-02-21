import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Hostel from '../pages/hostels/Hostel'
import Home from '../pages/home/Home'
import HostelPage from '../components/HostelDetails'
import ContactPage from '../pages/contact/Contact'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'

const MainRoutes=() =>
{
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hostel' element={<Hostel />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/hostel/:id' element={<HostelPage />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Routes>
    )
}

export default MainRoutes
