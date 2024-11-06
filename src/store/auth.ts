import { create } from 'zustand'
import { ILoginPayload, ILoginStore } from '../interfaces'
const url = import.meta.env.VITE_BACKEND_URL;
export const useAuth = create<ILoginStore>((set) => ({
  logued: false,
  paylaod: {email:'', role:''},
  login: (v:ILoginPayload) => set(() => ({ logued: true, paylaod:v })),
  logout: () => set({ logued: false }),
  check: () => set((state:ILoginStore)=>{
    if(state.logued){
      return {logued:false}      
    }else{
      return {logued:true}
    }    
  }),
  checkSession: async () => {
    try {
        const pet = await fetch(url+"/auth/check", {
            credentials:'include'
        });
        if(pet.status >= 200 && pet.status < 300){
          set({ logued: true });
        }else{
          set({ logued: false });
        }
    } catch {
      set({ logued: false });
    }
  }
  //switchNMode: ()=>set((state:IConfiguracion) => {
  //  const v = !state.nMode;
  //  v ? $doc.classList.add('dark') : $doc.classList.remove('dark');
  //  v ? $themeColor?.setAttribute('content', '#1D2B2A') : $themeColor?.setAttribute('content', '#4A7D73');
  //  localStorage.setItem('nmode', v+"");
  //  return {nMode: v};
  //}),
}))
