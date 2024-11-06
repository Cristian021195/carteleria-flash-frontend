import { BrowserRouter } from "react-router-dom"
import { PublicRouter, AdminRouter, UserRouter } from './router';
import { useAuth } from "./store";
import { useEffect } from "react";
function App() {
  const {logued, paylaod, checkSession} = useAuth();
  useEffect(()=>{
    checkSession()
  },[])
  return (
    <BrowserRouter>
      { 
        logued ? (paylaod.role === 'admin' ? <AdminRouter/> : <UserRouter/>) : <PublicRouter/>
      }      
    </BrowserRouter>
  )
}

export default App
