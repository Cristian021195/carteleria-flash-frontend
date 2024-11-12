/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { LoadingIcon } from "../../components/icons";
import { useUi } from "../../store";
import useDebounce from "../../hooks/useDebounce";
import { TFormCartel, TProveedor } from "../../types";
//const url = import.meta.env.VITE_BACKEND_FAKE;
const url = import.meta.env.VITE_BACKEND_URL;

export const CargarCartel = () => {
  const [nuevoProveedor, setNuevoProveedor] = useState<TProveedor>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {notificate} = useUi();
  const [fData, setFData] = useState<TFormCartel>({
    id_proveedor:'',
    formato:'gigantografia',
    direccion:'',
    cantidad:'',
    ancho:'',
    alto:'',
    metros_cuadrados:'',
    cantidad_gestionada:'',
    metros_cuadrados_gestionado:'',
    cantidad_privada:'',
    metros_cuadrados_privado:'',
    cantidad_libre:'',
    metros_cuadrados_libre:'',
    estimado:''
  });
  const [errors, setErrors] = useState<TFormCartel>({});

  //debounce
  const [loadingFiltro, setLoadingFiltro] = useState(false);
  const [filtroProveedor, setFiltroProveedor] = useState("");
  const [showFiltro, setShowFiltro] = useState(false);
  const debouncedFilter = useDebounce(filtroProveedor, 1000);
  const [resultadosFiltro, setResultadosFiltro] = useState<TProveedor[]>([]);

  useEffect(()=>{
    if(filtroProveedor.length > 1){
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
        if(res.length > 0) {
          setShowFiltro(true);
        }
      })
      .catch(err=>console.log(err))
      .finally(()=>{
        setLoadingFiltro(false);
      })
    }else{
      setResultadosFiltro([]);
    }
  },[debouncedFilter])
  
  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setFData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const errs = {} as any;
    let fv = true;

    if (!fData.direccion) {
      fv = false;
      errs.direccion = "Requerido";
    }
    
    if (!fData.cantidad || Number(fData.cantidad) < 0) {
      fv = false;
      errs.cantidad = "Requerido y positivo";
    }
    if (!fData.ancho || Number(fData.ancho) < 0) {
      fv = false;
      errs.ancho = "Requerido y positivo";
    }
    if (!fData.alto || Number(fData.alto) < 0) {
      fv = false;
      errs.alto = "Requerido y positivo";
    }
    if (!fData.metros_cuadrados || Number(fData.metros_cuadrados) < 0) {
      fv = false;
      errs.metros_cuadrados = "Requerido y positivo";
    }
    if (!fData.cantidad_gestionada || Number(fData.cantidad_gestionada) < 0) {
      fv = false;
      errs.cantidad_gestionada = "Requerido y positivo";
    }
    if (!fData.metros_cuadrados_gestionado || Number(fData.metros_cuadrados_gestionado) < 0) {
      fv = false;
      errs.metros_cuadrados_gestionado = "Requerido y positivo";
    }
    if (!fData.cantidad_privada || Number(fData.cantidad_privada) < 0) {
      fv = false;
      errs.cantidad_privada = "Requerido y positivo";
    }
    if (!fData.metros_cuadrados_privado || Number(fData.metros_cuadrados_privado) < 0) {
      fv = false;
      errs.metros_cuadrados_privado = "Requerido y positivo";
    }
    if (!fData.cantidad_libre || Number(fData.cantidad_libre) < 0) {
      fv = false;
      errs.cantidad_libre = "Requerido y positivo";
    }
    if (!fData.metros_cuadrados_libre || Number(fData.metros_cuadrados_libre) < 0) {
      fv = false;
      errs.metros_cuadrados_libre = "Requerido y positivo";
    }
    if (!fData.estimado) {
      fv = false;
      errs.estimado = "Requerido";
    }

    setErrors(errs);
    return fv;
  }

  const getNuevoProveedor = async (id: string) => {
    try {
      setLoadingFiltro(true);
      const pet = await fetch(url+"/proveedor/simple/"+id, {
        headers:{
          'Content-Type':'application/json'
        }
      });
      const res = await pet.json();
      if(pet.ok){        
        setNuevoProveedor(res);
      }else{
        throw new Error("No se pudo consultar el nuevo proveedor: "+res?.error);
      }
    } catch (error:any) {
      console.log(error)
    }finally{
      setLoadingFiltro(false);
    }
  }

  
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (validate()){
      try {
        setLoading(true);
        const pet = await fetch(url+"/cartel", {
          method:'POST',
          body:JSON.stringify(fData),//, credentials:'include'
          headers:{
            'Content-Type':'application/json'
          }
        });
        if(pet.ok){
          //const res = await pet.json();
          notificate({colors:'bg-green-500 text-white', isvisible:true, value: "Cartel creado correctemente", type:'exito'});
        }else{
          const res = await pet.json();
          throw new Error("No se pudo crear: "+res?.error);
        }
      } catch (error:any) {
        console.log(error)
        //setErrorMsg(error.message+"");
        notificate({colors:'bg-red-500 text-white', isvisible:true, value: error.message+"", type:'error'});
      }finally{
        setLoading(false);
      }
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
                <label htmlFor="proveedor" className="w-full flex justify-between items-center">Proveedor: 
                {loadingFiltro && <LoadingIcon size={20}/>} &nbsp;
                </label>
                <div className="relative">
                  <input type="text" name="proveedor" id="proveedor" value={filtroProveedor} onChange={(e)=>{setFiltroProveedor(e.target.value);}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <div className={showFiltro ?
                    "bg-slate-50 border-b-2 border-l-2 border-r-2 border-slate-300 absolute w-full rounded-b-md px-1 flex-col [&>button]:text-start [&>button]:w-full"
                    : "hidden"}>
                    {
                      resultadosFiltro.map((rf, rfi)=>(
                        <button type="button" key={rfi} title={rf.nombre} onClick={()=>{
                          getNuevoProveedor(rf.id+"");
                          setFData({...fData, id_proveedor: rf.id+""});
                          setShowFiltro(false);
                        }}>
                          <small>{rf.razon_social} - {rf.nombre} {rf.apellido}</small>
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <label className="w-full flex justify-between items-center">
                  <small><b>Proveedor seleccionado:</b> {nuevoProveedor?.razon_social} - {nuevoProveedor?.nombre} {nuevoProveedor?.apellido} </small>
                </label>
              </div>
              <div>
                  <input type="hidden" name="id_proveedor" id="id_proveedor" value={fData.id_proveedor}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
              </div>
              <div className="justify-between hidden">
                <label htmlFor="id_proveedor_old" className="w-full">Proveedores: 
                  &nbsp;{(!loadingFiltro && resultadosFiltro.length > 0) && "✔️"}
                </label>
                <select name="id_proveedor_old" id="id_proveedor_old" onChange={()=>{}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1 w-44">
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
                <select name="formato" id="formato" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1">
                  <option value="gigantografia">Gigantografia</option>
                  <option value="sextuples">Sextuples</option>
                  <option value="formato especial">Formato Especial</option>
                  <option value="vinilos verticales">Vinilos Verticales</option>
                  <option value="supervallas">Supervallas</option>
                </select>
              </div>
              <div className="flex justify-between">
                <label htmlFor="direccion" className="w-full"><span className="text-red-500">*</span>Dirección: </label>
                <div>
                  <input type="text" name="direccion" id="direccion" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.direccion}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="cantidad" className="w-full"><span className="text-red-500">*</span>Cantidad: </label>
                <div>
                  <input type="number" name="cantidad" id="cantidad" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.cantidad}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="ancho" className="w-full"><span className="text-red-500">*</span>Ancho: </label>
                <div>
                  <input type="number" name="ancho" id="ancho" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.ancho}</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="alto" className="w-full"><span className="text-red-500">*</span>Alto: </label>
                <div>
                  <input type="number" name="alto" id="alto" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.alto}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados" className="w-full"><span className="text-red-500">*</span>Metros cuadrados<sup></sup>: </label>
                <div>
                  <input type="number" name="metros_cuadrados" id="metros_cuadrados" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.metros_cuadrados}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="cantidad_gestionada" className="w-full"><span className="text-red-500">*</span>Cantidad Gestionada: </label>
                <div>
                  <input type="number" name="cantidad_gestionada" id="cantidad_gestionada" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.cantidad_gestionada}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados_gestionado" className="w-full"><span className="text-red-500">*</span>M<sup>2</sup> Gestionados: </label>
                <div>
                  <input type="number" name="metros_cuadrados_gestionado" id="metros_cuadrados_gestionado" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.metros_cuadrados_gestionado}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="cantidad_privada" className="w-full"><span className="text-red-500">*</span>Cantidad Privada: </label>
                <div>
                  <input type="number" name="cantidad_privada" id="cantidad_privada" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.cantidad_privada}</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados_privado" className="w-full"><span className="text-red-500">*</span>M<sup>2</sup> Privados: </label>
                <div>
                  <input type="number" name="metros_cuadrados_privado" id="metros_cuadrados_privado" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.metros_cuadrados_privado}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="cantidad_libre" className="w-full"><span className="text-red-500">*</span>Cantidad Libre: </label>
                <div>
                  <input type="number" name="cantidad_libre" id="cantidad_libre" onChange={(e)=>{handleChange(e)}}
                  className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.cantidad_libre}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="metros_cuadrados_libre" className="w-full"><span className="text-red-500">*</span>M<sup>2</sup> Libres: </label>
                <div>
                  <input type="number" name="metros_cuadrados_libre" id="metros_cuadrados_libre" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.metros_cuadrados_libre}</small>
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <label htmlFor="estimado" className="w-full"><span className="text-red-500">*</span>Fecha estimada: </label>
                <div>
                  <input type="date" name="estimado" id="estimado" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.estimado}</small>
                  </span>
                </div>
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
