import React from 'react'
import NavbarMain from './NavbarMain'
import Cards from '../Components/Cards'

function Home() {
  return (
    
    <>
    <div>
        <NavbarMain/>

        <div className='container mt-4 '>
        <div className='row d-flex justify-content-center  gap-4'>

        <Cards/><Cards/>
        
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>

        <Cards/>
        <Cards/>
        
          
         
        </div >
        
      </div>
        
    </div>
    </>
  )
}

export default Home