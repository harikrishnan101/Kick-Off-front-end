import NavbarMain from "./Pages/NavbarMain";
import WelcomePage from "./Pages/WelcomePage";

import {Route,Routes,BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Components/LoginPage";
import Home from "./Pages/Home";
import CourtReg from "./Pages/CourtReg";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
<Route path="/" element={<WelcomePage/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/CourtRegistration" element={<CourtReg/>}/>




      </Routes>
      
      </BrowserRouter>
    
    </div>
  );                                                                    
}

export default App;
