import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../helpers'
import { Home, Login, Reporte } from '../pages';
import { Menubar, UserSidebar } from '../components/layout';
import { AdministrarCartel } from '../pages/cartel';
import { AdministrarProveedor } from '../pages/proveedor';
import { AdministrarCliente } from '../pages/cliente';

export const UserRouter = () => {
  const {pathname} = useLocation();
  HeadTitleUrl(pathname, 'Usario');
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
                    <Route path='/cartel/administrar' element={<AdministrarCartel/>}/>
                    <Route path='/proveedor/administrar' element={<AdministrarProveedor/>}/>
                    <Route path='/cliente/administrar' element={<AdministrarCliente/>}/>
                    <Route path='*' element={<Home/>}></Route>
                </Routes>
              </div>
        </div>
    </div>
  )
}