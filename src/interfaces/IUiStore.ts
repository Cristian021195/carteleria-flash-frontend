export interface IUiStore{
    isopen:boolean,
    open: ()=>void,
    close: ()=>void,
    toggle: ()=>void
}