export type TProveedor = {
    id?:           string;
    activo:       boolean;
    nombre:       string;
    apellido:     string;
    email:        string;
    razon_social: string;
    tipo:         string;
    cuit:         number;
    created_at:   string;
    updated_at:   string;
    telefono:     string;
    telefono2:    string;
}

export type TFormProveedor = {
    nombre?:       string;
    apellido?:     string;
    email?:        string;
    razon_social?: string;
    tipo?:         string;
    cuit?:         string;
    telefono?:     string;
    telefono2?:    string;
}