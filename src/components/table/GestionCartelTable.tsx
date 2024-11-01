export const GestionCartelTable = () => {
  return (
    <div className="overflow-x-scroll">
        <table className="min-w-full bg-white p-4">
            <thead className="[&>tr]:h-14 [&>tr]:text-left text-slate-700">
                <tr className="[&>th]:text-nowrap [&>th]:px-4">
                    <th>#ID</th>
                    <th>PROVEEDOR</th>
                    <th>FORMATO</th>
                    <th>ANCHO</th>
                    <th>ALTO</th>
                    <th>CANTIDAD</th>
                    <th>M<sup>2</sup></th>
                    <th>CANT. GESTIONADA</th>
                    <th>M<sup>2</sup> GESTIONADOS</th>
                    <th>CANT. PRIVADA</th>
                    <th>M<sup>2</sup> PRIVADOS</th>
                    <th>CANT. LIBRE</th>
                    <th>M<sup>2</sup> LIBRES</th>
                    <th>ESTIMADO</th>
                    <th>CREADO</th>
                </tr>
            </thead>
            <tbody className="[&>tr]:h-8 [&>tr]:text-left [&>tr:nth-child(odd)]:bg-slate-100 [&_tr:hover]:bg-slate-200 [&>tr>td]:px-4">
                <tr>
                    <td>#id</td>
                    <td>proveedor</td>
                    <td>formato</td>
                    <td>ancho</td>
                    <td>alto</td>
                    <td>cantidad</td>
                    <td>m<sup>2</sup></td>
                    <td>cant. gestionada</td>
                    <td>m<sup>2</sup> gestionados</td>
                    <td>cant. privada</td>
                    <td>m<sup>2</sup> privados</td>
                    <td>cant. libre</td>
                    <td>m<sup>2</sup> libres</td>
                    <td>estimado</td>
                    <td>creado</td>
                </tr>
                <tr>
                    <td>#id</td>
                    <td>proveedor</td>
                    <td>formato</td>
                    <td>ancho</td>
                    <td>alto</td>
                    <td>cantidad</td>
                    <td>m<sup>2</sup></td>
                    <td>cant. gestionada</td>
                    <td>m<sup>2</sup> gestionados</td>
                    <td>cant. privada</td>
                    <td>m<sup>2</sup> privados</td>
                    <td>cant. libre</td>
                    <td>m<sup>2</sup> libres</td>
                    <td>estimado</td>
                    <td>creado</td>
                </tr>
                <tr>
                    <td>#id</td>
                    <td>proveedor</td>
                    <td>formato</td>
                    <td>ancho</td>
                    <td>alto</td>
                    <td>cantidad</td>
                    <td>m<sup>2</sup></td>
                    <td>cant. gestionada</td>
                    <td>m<sup>2</sup> gestionados</td>
                    <td>cant. privada</td>
                    <td>m<sup>2</sup> privados</td>
                    <td>cant. libre</td>
                    <td>m<sup>2</sup> libres</td>
                    <td>estimado</td>
                    <td>creado</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
