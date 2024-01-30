import React, { useEffect, useState } from 'react'
import NavbarMain from './NavbarMain'
import Cards from '../Components/Cards'
import AxiosInstance from '../Configure/AxiosInstance'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'

function Home() {

  const[courtData,setcourtData]=useState([])
const {searchText}=useSelector((state)=>state.user)
  useEffect(()=>{
getAllCourtData()
  },[searchText])

  const getAllCourtData=()=>{
    AxiosInstance.get('users/getAllCourtData',{params:{searchText:searchText ?? null}}).then((res)=>{
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
    {/* <Footer/> */}
    </>
  )
}

export default Home