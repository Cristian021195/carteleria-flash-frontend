/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { LoadingIcon, PadlockIcon } from "../components/icons"
import { useAuth } from "../store";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;

export const Login = () => {
  const [form, setForm] = useState({email:'', password:''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();
  const flogin = async (e:React.FormEvent)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const pet = await fetch(`${url}/auth/login`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(form)
      })
      if(pet.ok){
        const res = await pet.json();
        document.cookie = `token=${res.token}; SameSite=None; Secure; Path=/`;
        login({email:res.email,role:res.role});
        navigate('/');
      }else{
        throw new Error("Código de respuesta incorrecto verifique sus credenciales");        
      }      
    } catch (error:any) {
      setError(error.message+"");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="md:w-2/3 max-w-96 fade-up">
        <div className="flex justify-center">
          <div className="rounded-full w-40 bg-white p-8">
            <PadlockIcon/>
          </div>
        </div>
        <form className="p-8 flex-col space-y-4" onSubmit={flogin}>
          <label className="block w-full" htmlFor="email">Email:
            <input className="w-full p-2" type="email" name="email" id="email"
            placeholder="sistemas@correoflash.com" required minLength={10} maxLength={50}
            value={form.email}
            onChange={(e)=>{
              setForm({...form, email:e.target.value})
            }}/>
          </label>
          <label className="block w-full" htmlFor="password">Usuario: 
            <input className="w-full p-2" type="password" name="password" id="password"
              placeholder="****************" required minLength={4} maxLength={16}
              value={form.password}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setForm({...form, password:e.target.value})
              }}
            />
          </label>
          <button className="w-full p-2 bg-[#222E3C] text-white font-bold text-center flex justify-center"
            type="submit" disabled={loading}
          >
            {loading ? <span><LoadingIcon/></span> : 'INGRESAR'}
          </button>
          {
            error != ""
            && <div className="p-2 bg-red-400">
                <b>Error: </b>
                <p>{error}</p>
              </div>
          }
        </form>
      </div>
      <button className="bg-red-500 p-2 text-white hidden"
        onClick={async ()=>{
          const pet = await fetch('http://localhost:8000/api/', {
            credentials:'include'
          });
          const res = await pet.json();
          console.log(res);
        }}
      >PROBAR</button>

<button className="bg-red-500 p-2 text-white hidden"
        onClick={async ()=>{
          document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        }}
      >BORRAR COOKIE</button>
    </div>
  )
}
