export type TCliente = {
    id?:           string;
    activo:       boolean;
    nombre:       string;
    apellido:     string;
    email:        string;
    tipo:         string;
    cuit:         number;
    created_at:   string;
    updated_at:   string;
    telefono:     string;
    telefono2:    string;
}

export type TFormCliente = {
    nombre?:       string;
    apellido?:     string;
    email?:        string;
    tipo?:         string;
    cuit?:         string;
    telefono?:     string;
    telefono2?:    string;
}