import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../helpers'
import { Home, Login } from '../pages';
import { Menubar, Sidebar } from '../components/layout';

export const PublicRouter = () => {
  const {pathname} = useLocation();
  HeadTitleUrl(pathname, 'Horabondi');
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='w-full bg-slate-100'>
            <Menubar/>
              <div className='m-4'>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
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