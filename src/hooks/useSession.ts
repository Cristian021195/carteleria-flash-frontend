const url = import.meta.env.VITE_BACKEND_URL;
export const useSession = () => {  
    const checkSession = async ()=>{
        try {
            const pet = await fetch(url, {
                credentials:'include'
            });
            console.log(pet);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        checkSession
    }
}
