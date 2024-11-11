// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css'
import Home from './pages/home/home';
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className ='p-4 h-screen flex items-center justify-center' >
     <Home/>
     {/* <SignUp/> */}

    </div>
  );
}

export default App
