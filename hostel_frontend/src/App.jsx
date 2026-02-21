import React from 'react'
import {useLocation} from 'react-router-dom'
import Nav from './components/Navbar'
import MainRoutes from './routes/MainRoutes'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const App=() =>
{
  const {pathname}=useLocation();
  const isAdminRoute=pathname.startsWith('/admin');

  return (
    <div className='min-h-screen w-full h-fit'>
      <ScrollToTop />
      {!isAdminRoute&&<Nav />}
      <MainRoutes />
      {!isAdminRoute&&<Footer />}
    </div>
  )
}

export default App