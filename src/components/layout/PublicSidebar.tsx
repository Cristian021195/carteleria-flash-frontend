import { Link } from "react-router-dom";
import { useUi } from "../../store"
import { MenuIcon } from "../icons"
import { AccordionHorizontal } from "../ui"

export const PublicSidebar = () => {
  const {isopen} = useUi();
  return (
    <AccordionHorizontal opn={isopen}>
      <div className="bg-[#222E3C] text-white h-screen w-72 px-8 pt-4">
          <div className="mb-8">
              <b className="text-xl">Empresa</b>
              
          </div>
          <span className="text-slate-300 text-sm">Administracion</span>
          <nav className="mt-8">
              <ul className="flex-col space-y-4 list-inside text-sm">
                  <li>
                    <Link to={'/'} className="flex gap-2 items-center">
                      <MenuIcon/> Inicio
                    </Link>
                  </li>
                  <li>
                    <Link to={'/cargar-comprobante'} className="flex gap-2 items-center">
                      <MenuIcon/> Carga Comprobante
                    </Link>                    
                  </li>
                  <li>
                    <Link to={'/cargar-comprobante'} className="flex gap-2 items-center">
                      <MenuIcon/> Carga Comprobante
                    </Link>                    
                  </li>
              </ul>
          </nav>
      </div>
    </AccordionHorizontal>
  )
}
