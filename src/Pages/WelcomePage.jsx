import React, { useState } from 'react';
import {
  
  MDBContainer,
  
} from 'mdb-react-ui-kit';

import '../Styles/WelcomePage.css';
import LoginPage from '../Components/LoginPage';
import SignupPage from '../Components/SignupPage';

function WelcomePage() {

  const [ShowLoginPage,setShowLoginPage]=useState('login')
  return (
    <MDBContainer fluid className="d-flex align-items-center justify-content-center home" style={{ minHeight: '100vh' }}>
      
{/* {ShowLoginPage?<LoginPage setShowLoginPage={setShowLoginPage}/>:<SignupPage/>}  */}


 {ShowLoginPage==='login' && <LoginPage setShowLoginPage={setShowLoginPage}/>}

 {ShowLoginPage==='signup' && <SignupPage setShowLoginPage={setShowLoginPage}/>}

    </MDBContainer>
  );
}

export default WelcomePage;



