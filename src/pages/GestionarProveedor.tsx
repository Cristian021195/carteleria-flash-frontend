/* eslint-disable @typescript-eslint/no-explicit-any */
//import { GestionCartelTable } from "../components/table"
//const url = import.meta.env.VITE_BACKEND_FAKE;
import { useState } from "react";
import { BaseTableOps } from "../components/table";
import { LoadingIcon } from "../components/icons";
import { useUi } from "../store";
import { TProveedor } from "../types";
const url = import.meta.env.VITE_BACKEND_URL;

export const GestionarProveedor = () => {
  const [loading, setLoading] = useState(false);
  const {notificate} = useUi();
  const [info, setInfo] = useState<TProveedor[]>([]);
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

  const validate = () => {
    if(fData.fecha_desde != "" && fData.fecha_hasta != ""){
      return true;
    }else{
      return false;
    }
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const pet = await fetch(url+"/proveedor/filtrado-fechas-tipo", {
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

  const exportar = async () => {
    if(validate()){
      try {
        setLoading(true);
        const pet = await fetch(url+"/export/proveedor", {
          method:'POST',
          body:JSON.stringify(fData),//, credentials:'include'
          headers:{
            'Content-Type':'application/json'
          }
        });      

        // Return the response as a Blob (binary data)
        if (pet.ok) {
          const data = await pet.blob();
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(data);
          link.href = url;
          link.download = 'asd.xlsx';
          link.click();
          window.URL.revokeObjectURL(url);
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
    }else{
      notificate({colors:'bg-orange-300', isvisible:true, value: "Fecha desde y hasta requeridas", type:'alerta'});
    }
  }

  return (
    <div className="fade-up max-w-[80vw] mx-auto">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">GESTIONAR PROVEEDORES</h1>
      </div>
      <div className="p-2 bg-white">
        <div className="">
          <form onSubmit={submit}>
              <div className="grid grid-cols-4 border-b-2 border-slate-200 items-center">
                  <div className="col-span-1 p-4 flex-col space-y-4">
                    <div className="flex justify-between">
                        <label htmlFor="fecha_desde" className="w-full">Fecha desde: </label>
                        <input type="date" name="fecha_desde" id="fecha_desde" required onChange={(e)=>{handleChange(e)}}
                          className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                    </div>
                  </div>
                  <div className="col-span-1 p-4 flex-col space-y-4">
                    <div className="flex justify-between">
                        <label htmlFor="fecha_hasta" className="w-full">Fecha hasta: </label>
                        <input type="date" name="fecha_hasta" id="fecha_hasta" required onChange={(e)=>{handleChange(e)}}
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
                    <div className="flex justify-end gap-4 items-center">
                      {loading && <LoadingIcon/>}
                      <button type="button" disabled={loading}
                        onClick={exportar}
                        className={loading ? "rounded-md py-1 px-4 text-white bg-green-900 line-through" : "rounded-md py-1 px-4 text-white bg-green-700"}>
                        Exportar
                      </button>
                      <button type="submit" disabled={loading}
                        className={loading ? "rounded-md py-1 px-4 text-white bg-slate-900 line-through" : "rounded-md py-1 px-4 text-white bg-slate-700"}>
                          Buscar
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
              {hader:'RAZON SOCIAL',accessorKey:'razon_social'},
              {hader:'TIPO',accessorKey:'tipo'},
              {hader:'CUIT',accessorKey:'cuit'},
              {hader:'CREADO',accessorKey:'created_at'},
              {hader:'ULTIMA ACTUALIZACIÓN',accessorKey:'updated_at'},
              {hader:'TELEFONO',accessorKey:'telefono'},
              {hader:'TELEFONO 2',accessorKey:'telefono2'},
              {
                header: 'ACCIONES',
                cell: (element:any) => (
                  <div className="flex gap-2 px-4">
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
  