import { NavLink } from "react-router-dom"
interface IProps {
    children: React.ReactNode,
    to: string
}
export const SidebarNavLink = ({children, to="/"}:IProps) => {
    return (//flex rounded-md gap-2 items-center bg-white text-black font-bold p-2 transition-all duration-300
        <NavLink to={to}  className={({ isActive }) =>
            isActive 
            ? "flex text-nowrap w-52 sm:max-w-48 rounded-md gap-2 items-center bg-white text-black font-bold p-2 transition-all duration-300"
            : "flex text-nowrap w-52 sm:max-w-48 rounded-md gap-2 items-center p-2 transition-all duration-300"}        >
            {children}
        </NavLink>
    )
}
