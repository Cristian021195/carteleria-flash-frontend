import { useUi } from "../../store";
import { MenuIcon } from "../icons"

const basecss = "w-full px-4 py-2 flex items-center";

export const Menubar = () => {
  const {toggle, notification:not} = useUi();
  return (
    <div>
      <div className={not.isvisible
          ? not.colors+" "+basecss
          : "bg-white "+basecss}>
        <div>
          <button onClick={()=>{toggle()}}><MenuIcon/></button>
        </div>
        {
          not.isvisible 
          && <div className="ps-4">
            <b>Error: </b> {not.value}
          </div>
        }
      </div>
    </div>
  )
}
