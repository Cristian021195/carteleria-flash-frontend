/* eslint-disable @typescript-eslint/no-explicit-any */
//import { GestionCartelTable } from "../components/table"
//const url = import.meta.env.VITE_BACKEND_FAKE;
import { useState } from "react";
import { BaseTableOps } from "../components/table";
import { TCliente } from "../types";
import { useUi } from "../store";
import { LoadingIcon } from "../components/icons";
const url = import.meta.env.VITE_BACKEND_URL;

export const GestionarCliente = () => {
  const [loading, setLoading] = useState(false);
  const {notificate} = useUi();
  const [info, setInfo] = useState<TCliente[]>([]);
  const [fData, setFData] = useState({
    fecha_desde:'',
    fecha_hasta:'',
    tipo:''
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
      const pet = await fetch(url+"/cliente/filtrado-fechas-tipo", {
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
        throw new Error("Error al consultar registros");
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
        <h1 className="text-2xl p-2">GESTIONAR CLIENTES</h1>
      </div>
      <div className="p-2 bg-white">
        <div>
          <form onSubmit={submit}>
              <div className="grid grid-cols-4 border-b-2 border-slate-200">
                  <div className="col-span-1 p-4 flex-col space-y-4">
                    <div className="flex justify-between">
                        <label htmlFor="fecha_desde" className="w-full">Fecha desde: </label>
                        <input type="date" name="fecha_desde" id="fecha_desde"  onChange={(e)=>{handleChange(e)}}
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
                    <div className="flex justify-between">                      
                      <label htmlFor="tipo" className="w-full">Tipo de proveedor: </label>
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
              {hader:'ACTIVO',accessorKey:'activo'},
              {hader:'NOMBRE',accessorKey:'nombre'},
              {hader:'APELLIDO',accessorKey:'apellido'},
              {hader:'EMAIL',accessorKey:'email'},
              {hader:'TIPO',accessorKey:'tipo'},
              {hader:'CUIT',accessorKey:'cuit'},
              {hader:'CREATED_AT',accessorKey:'created_at'},
              {hader:'UPDATED_AT',accessorKey:'updated_at'},
              {hader:'TELEFONO',accessorKey:'telefono'},
              {hader:'TELEFONO2',accessorKey:'telefono2'},
              {
                header: 'ACCIONES',
                cell: (element:any) => (
                  <div className="flex gap-2 px-4 justify-center">
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
  