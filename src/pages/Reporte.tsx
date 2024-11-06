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
          <button className="p-2 rounded-md bg-[#222E3C] text-white"
            onClick={async ()=>{

              // Fetch request to download the file
            fetch('http://localhost:8000/api/export/users')
            .then(response => {
              // Check if the response is successful
              if (!response.ok) {
                throw new Error('Failed to download the file');
              }
              // Return the response as a Blob (binary data)
              return response.blob();
            })
            .then(blob => {
              // Create a URL for the Blob object
              const link = document.createElement('a');
              const url = window.URL.createObjectURL(blob);

              // Set the download attribute to suggest a filename
              link.href = url;
              link.download = 'users.xlsx'; // Set your file name here

              // Programmatically click the link to trigger the download
              link.click();

              // Clean up the object URL after the download
              window.URL.revokeObjectURL(url);
            })
            .catch(error => {
              console.error('Error downloading the file:', error);
            });

            }}
          >Descargar</button>

          <button className="p-2 rounded-md bg-red-500 text-white"
            onClick={async ()=>{
              const pet = await fetch('http://localhost:8000/api/auth/check', {
                credentials:'include'
              });

              const res = await pet;
              console.log(res);
            }}>Check Token</button>
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
