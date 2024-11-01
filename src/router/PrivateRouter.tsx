import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../helpers'
import { CargarCartel, CargarComprobante, GestionarCartel, Home, Login, Reporte } from '../pages';
import { Menubar, PrivateSidebar } from '../components/layout';

export const PrivateRouter = () => {
  const {pathname} = useLocation();
  HeadTitleUrl(pathname, 'Horabondi');
  return (
    <div className='flex'>
        <PrivateSidebar/>
        <div className='w-full bg-slate-100'>
            <Menubar/>
              <div className='m-8'>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/cargar-comprobante' element={<CargarComprobante/>}></Route>
                    <Route path='/reporte' element={<Reporte/>}></Route>

                    <Route path='/cartel/cargar' element={<CargarCartel/>}/>
                    <Route path='/cartel/gestionar' element={<GestionarCartel/>}/>
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