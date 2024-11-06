import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../helpers'
import { AsignarCliente, AsignarProveedor, CargarCartel, CargarCliente, CargarProveedor, EditarCartel, GestionarCartel, GestionarCliente, GestionarProveedor, Home, Login, Reporte } from '../pages';
import { Menubar, AdminSidebar } from '../components/layout';

export const AdminRouter = () => {
  const {pathname} = useLocation();
  HeadTitleUrl(pathname, 'Carteleria');
  return (
    <div className='flex'>
        <AdminSidebar/>
        <div className='w-full bg-slate-100 overflow-y-scroll h-screen'>
            <Menubar/>
              <div className='m-8'>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/reporte' element={<Reporte/>}></Route>

                    <Route path='/cartel/cargar' element={<CargarCartel/>}/>
                    <Route path='/cartel/:id/editar' element={<EditarCartel/>}/>
                    <Route path='/cartel/gestionar' element={<GestionarCartel/>}/>
                    <Route path='/cartel/asignar-cliente' element={<AsignarCliente/>}/>
                    <Route path='/cartel/asignar-proveedor' element={<AsignarProveedor/>}/>

                    <Route path='/proveedor/cargar' element={<CargarProveedor/>}/>
                    <Route path='/proveedor/gestionar' element={<GestionarProveedor/>}/>

                    <Route path='/cliente/cargar' element={<CargarCliente/>}/>
                    <Route path='/cliente/gestionar' element={<GestionarCliente/>}/>
                </Routes>
              </div>
        </div>
    </div>
  )
}

/*
    <Route path='/config' element={<Configuracion/>}></Route>
    <Route path='/config-horario-form' element={<ConfiguracionHorarioForm/>}></Route>
    <Route path='/empresa' element={<EmpresaLayout/>}>
    <Route path=':id/:entrada' element={<Empresa/>}></Route>
    </Route>
    <Route path='/scan' element={<Scan/>}></Route>
    <Route path='/scan-shortcut' element={<ScanShortcut/>}></Route>
    <Route path='/info' element={<Info/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/source' element={<Source/>}></Route>
    <Route path='/language' element={<Language/>}></Route>
    <Route path='/instructivo' element={<Instructivo/>}></Route>
    <Route path='*' element={<Home/>}></Route>

    routes>..
    <BottomNavbar/>
*/