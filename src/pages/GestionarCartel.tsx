/* eslint-disable @typescript-eslint/no-explicit-any */
//import { GestionCartelTable } from "../components/table"
//const url = import.meta.env.VITE_BACKEND_FAKE;
import { useState } from "react";
import { BaseTableOps } from "../components/table";
import data from "../json/carteles.json";
export const GestionarCartel = () => {
  const [info, setInfo] = useState(data.carteles);

  return (
    <div className="fade-up max-w-[80vw] mx-auto">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">GESTIONAR CARTELES</h1>
      </div>
      <div className="p-2 bg-white">
        <div className="">
          <form>
              <div className="grid grid-cols-3">
                  <div className="col-span-1 p-4 flex-col space-y-4">
                  <div className="flex justify-between">
                      <label htmlFor="" className="w-full">Proveedor: </label>
                      <select name="formato" id="formato">              
                      <option value="" disabled>Seleccionar un formato</option>
                      <option value="gigantografia">Gigantografia</option>
                      </select>
                  </div>
                  </div>
                  <div className="col-span-1 p-4 flex-col space-y-4">
                  <div className="flex justify-between">
                      <label htmlFor="" className="w-full">Cantidad Gestionada: </label>
                      <input type="number" name="" id="" className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  </div>
                  </div>
                  <div className="col-span-1 p-4 flex-col space-y-4">
                  <div className="flex justify-between">
                      <label htmlFor="" className="w-full">Cantidad Libre: </label>
                      <input type="number" name="" id="" className="border-2 border-slate-300 rounded-md focus:border-2 focus:border-slate-500 focus:outline-none ps-1"/>
                  </div>
                  <div className="flex justify-end">
                      <button type="button" className="rounded-md py-2 px-4 text-white bg-slate-700">
                      Buscar
                      </button>
                  </div>
                  </div>
              </div>
          </form>
        </div>
        <div>
          <BaseTableOps data={info} columns={
            [ {hader:'#ID',accessorKey:'id'},
              {hader:'ID_PROVEEDOR',accessorKey:'id_proveedor'},
              {hader:'FORMATO',accessorKey:'formato'},
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
  