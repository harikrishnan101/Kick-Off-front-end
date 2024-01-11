import React from 'react'
import Navbarmain from './NavbarMain'
import MyCourtComponents from '../Components/MyCourtComponents'
import Footer from './Footer'


function MyCourts() {
  return (
    <>
    <div>
        <Navbarmain/>

        <div className='container mt-4 '>
        <div className='row d-flex justify-content-center  gap-4'>

        <MyCourtComponents/>
        
        
        
          
         
        </div >
        
      </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default MyCourts


