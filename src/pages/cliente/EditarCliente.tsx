/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { LoadingIcon } from "../../components/icons";
import { useUi } from "../../store";
import { TFormCliente } from "../../types";
import { useParams } from "react-router-dom";
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

const tipo_opts = [
  {value:"", label:"Seleccionar un tipo"},
  {value:"particular", label:"Particular"},
  {value:"bancario", label:"Bancario"},
  {value:"canje", label:"Canje"},
  {value:"obra", label:"Obra"},
  {value:"cerramiento de obra", label:"Cerramiento de obra"},
];

export const EditarCliente = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {notificate} = useUi();
  const [fData, setFData] = useState(init_state);
  const [errors, setErrors] = useState<TFormCliente>({});

  useEffect(()=>{
    setLoading(true)
    fetch(url+"/cliente/simple/"+id)////, credentials:'include'
    .then(res=>res.json())
    .then(res=>{
      setFData(res);
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    });
  },[])

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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex = /^\d{11}$/;

    if (!fData.nombre || fData.nombre.length < 3) {
      fv = false;
      errs.nombre = "Requerido y mayor a 3 caracteres";
    }
    if (!fData.apellido || fData.apellido.length < 3) {
      fv = false;
      errs.apellido = "Requerido y mayor a 3 caracteres";
    }
    if (!fData.email || !emailRegex.test(fData.email)) {
      fv = false;
      errs.email = "Requerido y debe ser mail valido";
    }
    if (!fData.tipo) {
      fv = false;
      errs.tipo = "Requerido";
    }
    if (!numberRegex.test(fData.cuit)) {
      fv = false;
      errs.cuit = "Requerido y positivo";
    }
    if (!fData.telefono || fData.telefono.length < 10 || fData.telefono.length > 13) {
      fv = false;
      errs.telefono = "Requerido, formato telefonico";
    }
    if (fData.telefono2 && !(fData.telefono2.length >= 10 && fData.telefono2.length <= 13)) {
      fv = false;
      errs.telefono2 = "Requerido, formato telefonico";
    }
    setErrors(errs);
    return fv;
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(validate()){
      try {
        setLoading(true);
        const pet = await fetch(url+"/cliente/"+id, {
          method:'PUT',
          body:JSON.stringify(fData),//, credentials:'include'
          headers:{
            'Content-Type':'application/json'
          }
        });
        if(pet.ok){
          //const res = await pet.json();
          notificate({colors:'bg-green-500 text-white', isvisible:true, value: "Cliente editado correctemente", type:'exito'});
          setFData(init_state);
        }else{
          const res = await pet.json();
          throw new Error("No se pudo editar: "+res?.error);
        }
      } catch (error:any) {
        notificate({colors:'bg-red-500 text-white', isvisible:true, value: error.message+"", type:'error'});
      }finally{
        setLoading(false);
      }
    }    
  }

  return (
    <div className="fade-up">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">EDITAR CLIENTE #{id}</h1>
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
                <label htmlFor="nombre" className="w-full"><span className="text-red-500">*</span>Nombre: </label>
                <div>
                  <input type="text" name="nombre" id="nombre" value={fData.nombre ? fData.nombre : ''}
                    onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                    <span className="text-red-500">
                    <small>{errors.nombre}</small>
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <label htmlFor="apellido" className="w-full"><span className="text-red-500">*</span>Apellido: </label>
                <div>
                  <input type="text" name="apellido" id="apellido" value={fData.apellido ? fData.apellido : ''} onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.nombre}</small>
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <label htmlFor="email" className="w-full"><span className="text-red-500">*</span>Email: </label>
                <div>
                  <input type="email" name="email" id="email" value={fData.email ? fData.email : ''} onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.email}</small>
                  </span>
                </div>
              </div>

            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="tipo" className="w-full"><span className="text-red-500">*</span>Tipo de cliente: </label>
                <div>
                  <select name="tipo" id="tipo"
                    value={fData.tipo ? fData.tipo : ''}
                    onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1">
                    {
                      tipo_opts.map((to, toi)=> <option key={toi} value={to.value}>{to.label}</option>)
                    }
                  </select>
                  <span className="text-red-500">
                    <small>{errors.tipo}</small>
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <label htmlFor="cuit" className="w-full"><span className="text-red-500">*</span>Cuit: Sin guiones ({fData.cuit.length}/11)</label>
                <div>
                  <input type="number" value={fData.cuit ? fData.cuit : ''} name="cuit" id="cuit" placeholder="Ej: 20493868287"
                    onChange={(e)=>{
                      if(e.target.value.length <= 11){
                        handleChange(e)
                      }                      
                    }}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  <span className="text-red-500">
                    <small>{errors.cuit}</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 p-4 flex-col space-y-4">
              <div className="flex justify-between">
                <label htmlFor="telefono" className="w-full"><span className="text-red-500">*</span>Telefono: </label>
                <div>
                  <input type="text" value={fData.telefono ? fData.telefono : ''} name="telefono" id="telefono" placeholder="Ej: +543852123542" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                    <span className="text-red-500">
                    <small>{errors.telefono}</small>
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <label htmlFor="telefono2" className="w-full">Telefono alternativo: </label>
                <div>
                  <input type="text" value={fData.telefono2 ? fData.telefono2 : ''} name="telefono2" id="telefono2" placeholder="Ej: +543852123542" onChange={(e)=>{handleChange(e)}}
                    className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                    <span className="text-red-500">
                    <small>{errors.telefono2}</small>
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
