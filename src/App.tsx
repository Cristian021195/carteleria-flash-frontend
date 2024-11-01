import { BrowserRouter } from "react-router-dom"
import { PublicRouter, PrivateRouter } from './router';
import { useAuth } from "./store";
import { useEffect } from "react";
function App() {
  const {logued, checkSession} = useAuth();
  useEffect(()=>{
    checkSession()
  },[])
  return (
    <BrowserRouter>
      { 
        logued ? <PrivateRouter/> : <PublicRouter/>
      }      
    </BrowserRouter>
  )
}

export default App
