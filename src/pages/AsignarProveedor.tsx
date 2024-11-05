/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { LoadingIcon } from "../components/icons";
import { useUi } from "../store";
import useDebounce from "../hooks/useDebounce";
import { TProveedor } from "../types";
//const url = import.meta.env.VITE_BACKEND_FAKE;
const url = import.meta.env.VITE_BACKEND_URL;

export const AsignarProveedor = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {notificate} = useUi();
  const [fData, setFData] = useState({
    id_proveedor:'',
    formato:'gigantografia',
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

  //debounce
  const [loadingFiltro, setLoadingFiltro] = useState(false);
  const [filtroProveedor, setFiltroProveedor] = useState("");
  const debouncedFilter = useDebounce(filtroProveedor, 1000);
  const [resultadosFiltro, setResultadosFiltro] = useState<TProveedor[]>([]);

  useEffect(()=>{
    if(filtroProveedor.length > 2){      
      setLoadingFiltro(true);
      fetch(url+"/proveedor/filtrar-nombre", 
        {
          method:'POST',
          body:JSON.stringify({nombre:filtroProveedor}),
          headers:{
            'Content-Type':'application/json'
          }
        }
      )
      .then(res=>res.json())
      .then(res=>{
        setResultadosFiltro(res);
      })
      .catch(err=>console.log(err))
      .finally(()=>{
        setLoadingFiltro(false);
      })
    }
  },[debouncedFilter])
  

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
      const pet = await fetch(url+"/cartel", {
        method:'POST',
        body:JSON.stringify(fData),//, credentials:'include'
        headers:{
          'Content-Type':'application/json'
        }
      });
      if(pet.status >= 200 && pet.status < 300){
        //const res = await pet.json();
        notificate({colors:'bg-green-500 text-white', isvisible:true, value: "Cartel creado correctemente", type:'exito'});
      }else{
        throw new Error("No se pudo crear");
      }
    } catch (error:any) {
      console.log(error)
      //setErrorMsg(error.message+"");
      notificate({colors:'bg-red-500', isvisible:true, value: error.message+"", type:'error'});
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="fade-up">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">ASIGNAR PROVEEDORES</h1>
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
                <label htmlFor="proveedor" className="w-full flex justify-between items-center">Proveedor: {loadingFiltro && <LoadingIcon size={14}/>}&nbsp;</label>
                <input type="text" name="proveedor" id="proveedor" value={filtroProveedor} onChange={(e)=>{setFiltroProveedor(e.target.value);}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="id_proveedor" className="w-full">Proveedor: </label>
                <select name="id_proveedor" id="id_proveedor" onChange={(e)=>{handleChange(e)}}>
                  <optgroup>
                    <option value="" defaultValue={''}>Seleccionar un proveedor</option>
                  </optgroup>
                  <optgroup>
                    {
                      resultadosFiltro.map((rf, rfi)=><option key={rfi} value={rf.id}>{rf.nombre}</option>)
                    }
                  </optgroup>
                </select>
              </div>
              <div className="flex justify-between">
                <label htmlFor="formato" className="w-full">Formato: </label>
                <select name="formato" id="formato" onChange={(e)=>{handleChange(e)}}>
                  <option value="gigantografia" selected>Gigantografia</option>
                  <option value="sextuples">Sextuples</option>
                  <option value="formato especial">Formato Especial</option>
                  <option value="vinilos verticales">Vinilos Verticales</option>
                  <option value="supervallas">Supervallas</option>
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
            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados" className="w-full">Metros cuadrados<sup></sup>: </label>
                <input type="number" name="metros_cuadrados" id="metros_cuadrados" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
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
