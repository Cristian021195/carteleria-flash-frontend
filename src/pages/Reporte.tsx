/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseTableOps } from "../components/table"
import datos from "../../datos.json";
import { useState } from "react";

export const Reporte = () => {
  const [info, setInfo] = useState(datos);
  return (
    <div className="fade-up">
      <div className="bg-[#222E3C] text-white">
        <h1 className="text-2xl p-2">REPORTES</h1>
      </div>
      <div className="p-2 bg-white">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem expedita explicabo incidunt commodi illo! Ipsa tenetur nemo illo harum dolores illum sequi recusandae doloremque omnis! Odio non amet veniam iusto.
        </div>
        <div className="m-4">
          <BaseTableOps data={info} columns={[
                {
                    header: "#ID",
                    accessorKey: 'id'
                },
                {
                    header: "#NOMBRE",
                    accessorKey: 'nombre'
                },
                {
                    header: "#MAIL",
                    accessorKey: 'email'
                },
                {
                    header: "#FECHA",
                    accessorKey: 'fecha'
                },
                {
                    header: "#MONTO",
                    accessorKey: 'monto'
                },
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
                        <button
                        onClick={() => alert(element.row.original.id)}
                        className="bg-red-900 px-1 rounded text-white"
                      >
                        Eliminar
                      </button>
                    </div>
                  ),
                }
            ]
          }/>
        </div>
      </div>
    </div>
  )
}
