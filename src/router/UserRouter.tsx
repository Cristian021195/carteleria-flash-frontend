import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../helpers'
import { GestionarCartel, GestionarCliente, GestionarProveedor, Home, Login, Reporte } from '../pages';
import { Menubar, UserSidebar } from '../components/layout';

export const UserRouter = () => {
  const {pathname} = useLocation();
  HeadTitleUrl(pathname, 'Carteleria');
  return (
    <div className='flex'>
        <UserSidebar/>
        <div className='w-full bg-slate-100 overflow-y-scroll h-screen'>
            <Menubar/>
              <div className='m-8'>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/reporte' element={<Reporte/>}></Route>
                    <Route path='/cartel/gestionar' element={<GestionarCartel/>}/>
                    <Route path='/proveedor/gestionar' element={<GestionarProveedor/>}/>
                    <Route path='/cliente/gestionar' element={<GestionarCliente/>}/>
                </Routes>
              </div>
        </div>
    </div>
  )
}