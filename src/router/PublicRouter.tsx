import { Route, Routes, useLocation } from 'react-router-dom'
import { HeadTitleUrl } from '../helpers'
import { Login } from '../pages';

export const PublicRouter = () => {
  const {pathname} = useLocation();
  HeadTitleUrl(pathname, 'Gestion Carteleria');
  return (
    <div className='flex'>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='*' element={<Login/>}></Route>
      </Routes>
    </div>
  )
}