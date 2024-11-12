/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, SortingState, getFilteredRowModel } from "@tanstack/react-table"

import { useState } from "react";
//[{"id":1,"nombre":"Alasdair","email":"agahagan0@hp.com","fecha":"11/15/2023","monto":4721.84},
interface IProps {
    data: any[],
    columns: any[],
    extra?:boolean,
    children?: React.ReactElement
}
export const BaseTableOps = ({data, columns, extra=false, children}:IProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtered, setFiltered] = useState("");
    //const [paginate, setPaginate] = useState({ pageIndex: 0, pageSize: 10 })
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {sorting, globalFilter: filtered},
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltered
    });
    return (
        <div>
            <div className="gap-4 items-center">
                <div>
                    <label htmlFor="filtrado" className="text-white bg-slate-500 p-1 rounded-l-md px-2 border-2 border-slate-500">Filtrado </label>
                    <input type="text" name="filtrado" id="filtrado" className="border-4 border-slate-300 rounded-r-md focus:border-4 focus:border-slate-500 focus:outline-none ps-1"
                    onChange={(e)=>{setFiltered(e.target.value)}} />
                </div>
            </div>
            <div className="overflow-x-scroll">
                <table className="min-w-full bg-white p-4">
                    <thead className="[&>tr]:h-14 [&>tr]:text-left text-slate-700">
                        {
                            table.getHeaderGroups().map((hg,hgi)=>(
                                <tr key={hgi} className="[&>th]:px-4 [&>th]:uppercase [&>th]:text-nowrap">
                                    {
                                        hg.headers.map((h,hi)=>(
                                            <th key={hi}
                                                onClick={h.column.getToggleSortingHandler()}
                                            >
                                                {
                                                    h.isPlaceholder 
                                                        ? null 
                                                        : (<div>
                                                            {flexRender(h.column.columnDef.header, h.getContext())}
                                                            {
                                                                {asc:' ▲', desc:' ▼'}[
                                                                    h.column.getIsSorted() ? 'asc' : 'desc'
                                                                ]
                                                            }
                                                        </div>)
                                                }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody className="[&>tr]:h-8 [&>tr]:text-left [&>tr:nth-child(odd)]:bg-slate-100 [&_tr:hover]:bg-slate-200">
                        {
                            table.getRowModel().rows.map((row,rowi)=>(
                                <tr key={rowi}>
                                    {
                                        row.getVisibleCells().map((cell, ci)=>(
                                            <td key={ci}>
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center pt-4">
                <div className="text-slate-600 flex gap-4 items-center">
                    <span><b>Total: </b>{table.getRowCount()} Registros</span>
                    {
                        extra && <div>{children}</div>
                    }
                </div>
                <div className="flex gap-2 justify-end">
                    <button className="bg-slate-500 text-white rounded-md py-1 px-2"
                        onClick={()=>{
                            table.setPageIndex(0)
                        }}
                    >Primera
                    </button>
                    <button className="bg-slate-500 text-white rounded-md py-1 px-2"
                        onClick={()=>{
                            table.previousPage();
                        }}
                    >Anterior
                    </button>
                    <button className="bg-slate-500 text-white rounded-md py-1 px-2"
                        onClick={()=>{
                            table.nextPage();
                        }}
                    >Siguiente
                    </button>
                    <button className="bg-slate-500 text-white rounded-md py-1 px-2"
                        onClick={()=>{
                            table.setPageIndex(table.getPageCount()-1)
                        }}
                    >Ultima
                    </button>
                </div>                
            </div>
        </div>
    )
}
