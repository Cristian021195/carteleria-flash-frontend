/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { LoadingIcon } from "../components/icons";
import { useUi } from "../store";
const url = import.meta.env.VITE_BACKEND_FAKE;

export const CargarCartel = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {notificate} = useUi();
  const [fData, setFData] = useState({
    id_proveedor:'',
    formato:'',
    cantidad:'',
    ancho:'',
    alto:'',
    metros_cuadrados:'',
    cantidad_gestionada:'',
    metros_cuadrados_gestionados:'',
    cantidad_privada:'',
    metros_cuadrados_privado:'',
    cantidad_libre:'',
    metros_cuadrados_libre:'',
    estimado:''
  });

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
      const pet = await fetch(url+"/carteles", {
        method:'POST',body:JSON.stringify(fData)//, credentials:'include'
      });
      if(pet.status >= 200 && pet.status < 300){
        //const res = await pet.json();
        notificate({colors:'bg-green-500 text-white', isvisible:true, value: "Cartel creado correctemente"});
      }else{
        throw new Error("No se pudo crear");
      }
    } catch (error:any) {
      console.log(error)
      //setErrorMsg(error.message+"");
      notificate({colors:'bg-red-500', isvisible:true, value: error.message+""});
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="fade-up">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">CARGAR CARTEL</h1>
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
                <label htmlFor="id_proveedor" className="w-full">Proveedor: </label>
                <select name="id_proveedor" id="id_proveedor" onChange={(e)=>{handleChange(e)}}>
                  <option value="" defaultValue={''}>Seleccionar un formato</option>
                  <option value="1">Havana</option>
                </select>
              </div>
              <div className="flex justify-between">
                <label htmlFor="formato" className="w-full">Formato: </label>
                <select name="formato" id="formato" onChange={(e)=>{handleChange(e)}}>              
                  <option value="" defaultValue={''}>Seleccionar un formato</option>
                  <option value="gigantografia">Gigantografia</option>
                </select>
              </div>
              <div className="flex justify-between">
                <label htmlFor="cantidad" className="w-full">Cantidad: </label>
                <input type="number" name="cantidad" id="cantidad" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="ancho" className="w-full">Ancho: </label>
                <input type="number" name="ancho" id="ancho" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="alto" className="w-full">Alto: </label>
                <input type="number" name="alto" id="alto" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados" className="w-full">Metros cuadrados<sup>2</sup>: </label>
                <input type="number" name="metros_cuadrados" id="metros_cuadrados" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="cantidad_gestionada" className="w-full">Cantidad Gestionada: </label>
                <input type="number" name="cantidad_gestionada" id="cantidad_gestionada" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados_gestionados" className="w-full">M<sup>2</sup> Gestionados: </label>
                <input type="number" name="metros_cuadrados_gestionados" id="metros_cuadrados_gestionados" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="cantidad_privada" className="w-full">Cantidad Privada: </label>
                <input type="number" name="cantidad_privada" id="cantidad_privada" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados_privado" className="w-full">M<sup>2</sup> Privados: </label>
                <input type="number" name="metros_cuadrados_privado" id="metros_cuadrados_privado" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="cantidad_libre" className="w-full">Cantidad Libre: </label>
                <input type="number" name="cantidad_libre" id="cantidad_libre" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados_libre" className="w-full">M<sup>2</sup> Libres: </label>
                <input type="number" name="metros_cuadrados_libre" id="metros_cuadrados_libre" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="estimado" className="w-full">Fecha estimada: </label>
                <input type="date" name="estimado" id="estimado" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-end">
                <button type="submit" onClick={()=>{console.log(fData)}}
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
