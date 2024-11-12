import { useNavigate } from "react-router-dom";
import { useUi } from "../../store"
import { CartelIcon, ClientesIcon, HomeIcon, LogoutIcon, ProveedorIcon, ReporteIcon } from "../icons"
import { Accordion, AccordionHorizontal, SidebarNavLink, SidebarSubNavLink } from "../ui"
import { useAuth } from '../../store/auth';
import { useState } from "react";

//const baseurl = import.meta.env.BASE_URL;

export const AdminSidebar = () => {
  const {isopen} = useUi();
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [mi, setMi] = useState({cartel:false, proveedor:false, cliente:false});
  return (
    <AccordionHorizontal opn={isopen}>
      <div className="bg-[#222E3C] text-white h-full px-6 pt-4 min-w-72">
          <div className="mb-8">
              <b className="text-xl">Empresa</b>              
          </div>
          <span className="text-slate-300 text-sm">Administracion</span>
          <nav className="mt-8 h-full">
              <ul className="space-y-2 text-sm">
                  <li>
                    <SidebarNavLink to={'/'}>
                      <HomeIcon/> Inicio
                    </SidebarNavLink>
                  </li>
                  <li>
                    <button onClick={()=>{
                        if(mi.cartel === true){
                          setMi({...mi, cartel:false})
                        }else{
                          setMi({...mi, cartel:true})
                        }                        
                      }
                    }
                    className="flex text-nowrap w-52 sm:max-w-48 rounded-md gap-2 items-center p-2 transition-all duration-300">
                      <CartelIcon/> Carteles
                    </button>
                    <Accordion opn={mi.cartel}>
                      <ul className="text-white ms-4 ps-2 border-l-2 list-inside [&>li]:my-2">
                        <li><SidebarSubNavLink to="/cartel/cargar">Cargar Cartel</SidebarSubNavLink></li>
                        <li><SidebarSubNavLink to="/cartel/administrar">Administrar Carteles</SidebarSubNavLink></li>
                        <li className="hidden"><SidebarSubNavLink to="/cartel/asignar-cliente">Asignar Cliente</SidebarSubNavLink></li>
                        <li className="hidden"><SidebarSubNavLink to="/cartel/asignar-proveedor">Asignar Proveedor</SidebarSubNavLink></li>
                      </ul>
                    </Accordion>
                  </li>
                  <li>
                    <button onClick={()=>{
                        if(mi.proveedor === true){
                          setMi({...mi, proveedor:false})
                        }else{
                          setMi({...mi, proveedor:true})
                        }                        
                      }
                    }
                    className="flex text-nowrap w-52 sm:max-w-48 rounded-md gap-2 items-center p-2 transition-all duration-300">
                      <ProveedorIcon/> Proveedores
                    </button>
                    <Accordion opn={mi.proveedor}>
                      <ul className="text-white ms-4 ps-2 border-l-2 list-inside [&>li]:my-2">
                        <li><SidebarSubNavLink to="/proveedor/cargar">Cargar Proveedor</SidebarSubNavLink></li>
                        <li><SidebarSubNavLink to="/proveedor/administrar">Administrar Proveedores</SidebarSubNavLink></li>
                      </ul>
                    </Accordion>
                  </li>
                  <li>
                    <button onClick={()=>{
                        if(mi.cliente === true){
                          setMi({...mi, cliente:false})
                        }else{
                          setMi({...mi, cliente:true})
                        }                        
                      }
                    }
                    className="flex text-nowrap w-52 sm:max-w-48 rounded-md gap-2 items-center p-2 transition-all duration-300">
                      <ClientesIcon/> Clientes
                    </button>
                    <Accordion opn={mi.cliente}>
                      <ul className="text-white ms-4 ps-2 border-l-2 list-inside [&>li]:my-2">
                        <li><SidebarSubNavLink to="/cliente/cargar">Cargar Cliente</SidebarSubNavLink></li>
                        <li><SidebarSubNavLink to="/cliente/administrar">Administrar Clientes</SidebarSubNavLink></li>
                      </ul>
                    </Accordion>
                  </li>
                  <li>
                    <SidebarNavLink to={'/reporte'}>
                      <ReporteIcon/> Reportes
                    </SidebarNavLink>
                  </li>
                  <li>
                    <button className="absolute bottom-0 mb-4 flex text-nowrap w-52 sm:max-w-48 rounded-md gap-2 items-center border-2 border-slate-100 font-bold p-2 transition-all duration-300"
                      onClick={()=>{
                        document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
                        logout();
                        navigate('/');
                      }}>
                      <LogoutIcon/> Cerrar Sesion
                    </button>
                  </li>
              </ul>
          </nav>
      </div>
    </AccordionHorizontal>
  )
}
