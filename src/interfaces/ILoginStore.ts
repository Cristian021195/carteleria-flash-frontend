export interface ILoginStore {
    logued:boolean,
    login: ()=>void,
    logout: ()=>void,
    check: ()=>void,
    checkSession: ()=>Promise<void>,
}