/* eslint-disable @typescript-eslint/no-explicit-any */
//import { GestionCartelTable } from "../components/table"
//const url = import.meta.env.VITE_BACKEND_FAKE;
import { useState } from "react";
import { BaseTableOps } from "../components/table";
import { useUi } from "../store";
import { LoadingIcon } from "../components/icons";
import { TCartel } from "../types";
const url = import.meta.env.VITE_BACKEND_URL;

export const GestionarCartel = () => {
  const [loading, setLoading] = useState(false);
  const {notificate} = useUi();
  const [info, setInfo] = useState<TCartel[]>([]);
  const [fData, setFData] = useState({
    fecha_desde:'',
    fecha_hasta:''
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
      const pet = await fetch(url+"/cartel/filtrado-fechas", {
        method:'POST',
        body:JSON.stringify(fData),//, credentials:'include'
        headers:{
          'Content-Type':'application/json'
        }
      });
      if(pet.status >= 200 && pet.status < 300){
        const res = await pet.json();
        setInfo(res);
        notificate({colors:'bg-green-500 text-white', isvisible:true, value: "Registros encontrados", type:'exito'});
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
    <div className="fade-up max-w-[80vw] mx-auto">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">GESTIONAR CARTELES</h1>
      </div>
      <div className="p-2 bg-white">
        <div className="">
          <form onSubmit={submit}>
              <div className="grid grid-cols-3 border-b-2 border-slate-200">
                  <div className="col-span-1 p-4 flex-col space-y-4">
                    <div className="flex justify-between">
                        <label htmlFor="fecha_desde" className="w-full">Fecha desde: </label>
                        <input type="date" name="fecha_desde" id="fecha_desde" onChange={(e)=>{handleChange(e)}}
                          className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                    </div>
                  </div>
                  <div className="col-span-1 p-4 flex-col space-y-4">
                    <div className="flex justify-between">
                        <label htmlFor="fecha_hasta" className="w-full">Fecha hasta: </label>
                        <input type="date" name="fecha_hasta" id="fecha_hasta" onChange={(e)=>{handleChange(e)}}
                          className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                    </div>
                  </div>
                  <div className="col-span-1 p-4 flex-col space-y-4">
                    <div className="flex justify-end">
                      <button type="submit" disabled={loading}
                        className="rounded-md py-2 px-4 text-white bg-slate-700">
                          {loading
                            ? <LoadingIcon/>
                            : "Buscar"
                          }                  
                      </button>
                    </div>
                  </div>
              </div>
          </form>
        </div>
        <div className="mt-4">
          <BaseTableOps data={info} columns={
            [ {hader:'#ID',accessorKey:'id'},
              {hader:'ID_PROVEEDOR',accessorKey:'id_proveedor'},
              {hader:'FORMATO',accessorKey:'formato'},
              {hader:'DIRECCION',accessorKey:'direccion'},
              {hader:'CANTIDAD',accessorKey:'cantidad'},
              {hader:'ANCHO',accessorKey:'ancho'},
              {hader:'ALTO',accessorKey:'alto'},
              {hader:'METROS_CUADRADOS',accessorKey:'metros_cuadrados'},
              {hader:'CANTIDAD_GESTIONADA',accessorKey:'cantidad_gestionada'},
              {hader:'METROS_CUADRADOS_GESTIONADOS',accessorKey:'metros_cuadrados_gestionados'},
              {hader:'CANTIDAD_PRIVADA',accessorKey:'cantidad_privada'},
              {hader:'METROS_CUADRADOS_PRIVADO',accessorKey:'metros_cuadrados_privado'},
              {hader:'CANTIDAD_LIBRE',accessorKey:'cantidad_libre'},
              {hader:'METROS_CUADRADOS_LIBRE',accessorKey:'metros_cuadrados_libre'},
              {hader:'ESTIMADO',accessorKey:'estimado'},
              {
                header: 'Actions',
                cell: (element:any) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setInfo(info.filter((inf)=> inf.id != element.row.original.id));
                      }}
                      className="bg-red-900 px-1 rounded text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                ),
              }]
          }/>
        </div>
      </div>
    </div>
  )
  }
  