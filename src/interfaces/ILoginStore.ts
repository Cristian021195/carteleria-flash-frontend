export interface ILoginPayload {
    role:string,
    email:string
}

export interface ILoginStore {
    logued:boolean,
    paylaod: ILoginPayload
    login: (v:ILoginPayload)=>void,
    logout: ()=>void,
    check: ()=>void,
    checkSession: ()=>Promise<void>,
}