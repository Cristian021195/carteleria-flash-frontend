import { useUi } from "../../store"
import { Menu } from "../icons"
import { AccordionHorizontal } from "../ui"

export const Sidebar = () => {
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
                  <li className="flex gap-2 items-center">
                    <Menu/> Carga Comprobantes
                  </li>
                  <li className="flex gap-2 items-center">
                    <Menu/> Reportes
                  </li>
              </ul>
          </nav>
      </div>
    </AccordionHorizontal>
  )
}
