import { useUi } from "../../store";
import { Menu } from "../icons"

export const Menubar = () => {
  const {toggle} = useUi();
  return (
    <div className="bg-white w-full px-4 py-2">
      <button onClick={()=>{toggle()}}><Menu/></button>
    </div>
  )
}
