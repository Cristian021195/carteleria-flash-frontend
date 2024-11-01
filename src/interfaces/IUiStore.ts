interface ITopNotification {
    colors: string,
    value: string,
    isvisible: boolean
}

export interface IUiStore{
    notification: ITopNotification,
    isopen:boolean,
    open: ()=>void,
    close: ()=>void,
    toggle: ()=>void,
    notificate: (v:ITopNotification)=>void
    
}