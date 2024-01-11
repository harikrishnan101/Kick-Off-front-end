import React, { useEffect, useState } from 'react'
import NavbarMain from './NavbarMain'
import Cards from '../Components/Cards'
import AxiosInstance from '../Configure/AxiosInstance'
import Footer from './Footer'

function Home() {

  const[courtData,setcourtData]=useState([])

  useEffect(()=>{
getAllCourtData()
  },[])

  const getAllCourtData=()=>{
    AxiosInstance.get('users/getAllCourtData').then((res)=>{
setcourtData(res?.data?.court)
    })
  }
  return (
    
    <>
    <div>
        <NavbarMain/>

        <div className='container mt-4 '>
        <div className='row d-flex justify-content-center  gap-4'>

        {
            courtData?.map((element)=>  <Cards data={element} />)
          }
        
       
        
          
         
        </div >
        
      </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default Home