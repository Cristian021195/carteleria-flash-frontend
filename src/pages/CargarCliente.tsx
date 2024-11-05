/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { LoadingIcon } from "../components/icons";
import { useUi } from "../store";
const url = import.meta.env.VITE_BACKEND_URL;
const init_state = {
  nombre: '',
  apellido: '',
  email: '',
  tipo: '',
  cuit: '',
  telefono: '',
  telefono2: ''
};

export const CargarCliente = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {notificate} = useUi();
  const [fData, setFData] = useState(init_state);

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setFData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const pet = await fetch(url+"/cliente", {
        method:'POST',
        body:JSON.stringify(fData),//, credentials:'include'
        headers:{
          'Content-Type':'application/json'
        }
      });
      if(pet.status >= 200 && pet.status < 300){
        //const res = await pet.json();
        notificate({colors:'bg-green-500 text-white', isvisible:true, value: "Cartel creado correctemente", type:'exito'});
        setFData(init_state);
      }else{
        throw new Error("No se pudo crear");
      }
    } catch (error:any) {
      notificate({colors:'bg-red-500', isvisible:true, value: error.message+"", type:'error'});
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="fade-up">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">CARGAR CLIENTE</h1>
      </div>
      <div className={errorMsg != "" ? "p-2 bg-red-500 text-white flex items-center" : "hidden"}>
        <div>
          <b>Error: </b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae cupiditate, quas fugit laudantium eos omnis fuga quos vel iste adipisci dolor soluta qui velit a molestiae numquam error, expedita harum?        
        </div>
        <div>
          <button className="px-1 rounded-md bg-[#222E3C]" onClick={()=>{setErrorMsg("")}}>Cerrar</button>
        </div>
      </div>
      <div className="p-2 bg-white">
        <form onSubmit={submit}>
          <div className="grid grid-cols-3">
            <div className="col-span-1 p-4 flex-col space-y-4">

              <div className="flex justify-between">
                <label htmlFor="nombre" className="w-full">Nombre: </label>
                <input type="text" name="nombre" id="nombre" value={fData.nombre} onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>

              <div className="flex justify-between">
                <label htmlFor="apellido" className="w-full">Apellido: </label>
                <input type="text" name="apellido" id="apellido" value={fData.apellido} onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>

              <div className="flex justify-between">
                <label htmlFor="email" className="w-full">Email: </label>
                <input type="email" name="email" id="email" value={fData.email} onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>

            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="tipo" className="w-full">Tipo de cliente: </label>
                <select name="tipo" id="tipo" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1">              
                  <optgroup>
                    <option value="" defaultValue={''}>Seleccionar un tipo</option>
                  </optgroup>
                  <optgroup>
                    <option value="particular">Particular</option>
                    <option value="bancario">Bancario</option>
                    <option value="canje">Canje</option>
                    <option value="obra">Obra</option>
                    <option value="cerramiento de obra">Cerramiento de obra</option>
                  </optgroup>
                </select>
              </div>

              <div className="flex justify-between">
                <label htmlFor="cuit" className="w-full">Cuit: Sin guiones</label>
                <input type="number" value={fData.cuit} name="cuit" id="cuit" placeholder="Ej: 20493868287" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="telefono" className="w-full">Telefono: </label>
                <input type="text" value={fData.telefono} name="telefono" id="telefono" placeholder="Ej: +543852123542" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>

              <div className="flex justify-between">
                <label htmlFor="telefono2" className="w-full">Telefono alternativo: </label>
                <input type="text" value={fData.telefono2} name="telefono2" id="telefono2" placeholder="Ej: +543852123542" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading}
                  className="rounded-md py-2 px-4 text-white bg-slate-700">
                    {loading
                      ? <LoadingIcon/>
                      : "Cargar"
                    }                  
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
