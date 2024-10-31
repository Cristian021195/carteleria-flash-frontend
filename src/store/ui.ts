import { create } from 'zustand'
import { IUiStore } from '../interfaces'
export const useUi = create<IUiStore>((set) => ({
  isopen: true,
  open: () => set(() => ({ isopen: true })),
  close: () => set({ isopen: false }),
  toggle: () => set((state:IUiStore)=>{
    if(state.isopen){
      return {isopen:false}      
    }else{
      return {isopen:true}
    }
    
  }),
  //switchNMode: ()=>set((state:IConfiguracion) => {
  //  const v = !state.nMode;
  //  v ? $doc.classList.add('dark') : $doc.classList.remove('dark');
  //  v ? $themeColor?.setAttribute('content', '#1D2B2A') : $themeColor?.setAttribute('content', '#4A7D73');
  //  localStorage.setItem('nmode', v+"");
  //  return {nMode: v};
    //}),
}))