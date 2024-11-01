import { NavLink } from "react-router-dom"
interface IProps {
    children: React.ReactNode,
    to: string
}
export const SidebarSubNavLink = ({children, to="/"}:IProps) => {
    return (//flex rounded-md gap-2 items-center bg-white text-black font-bold p-2 transition-all duration-300
        <NavLink to={to}  className={({ isActive }) =>
            isActive 
            ? "flex gap-2 items-center border-l-2 border-slate-400"
            : "flex gap-2 items-center"}>&nbsp;
            {children}
        </NavLink>
    )
}
