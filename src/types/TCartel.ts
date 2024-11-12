export type TCartel = {
    id:                           string;
    id_proveedor:                 number;
    formato:                      string;
    direccion:                    string;
    cantidad:                     number;
    ancho:                        number;
    alto:                         number;
    metros_cuadrados:             number;
    cantidad_gestionada:          number;
    metros_cuadrados_gestionado: number;
    cantidad_privada:             number;
    metros_cuadrados_privado:     number;
    cantidad_libre:               number;
    metros_cuadrados_libre:       number;
    estimado:                     Date;
    created_at:                   Date;
    updated_at:                   Date;
}

export type TFormCartel = {
    id_proveedor?:                 string;
    formato?:                      string;
    direccion?:                    string;
    cantidad?:                     string;
    ancho?:                        string;
    alto?:                         string;
    metros_cuadrados?:             string;
    cantidad_gestionada?:          string;
    metros_cuadrados_gestionado?: string;
    cantidad_privada?:             string;
    metros_cuadrados_privado?:     string;
    cantidad_libre?:               string;
    metros_cuadrados_libre?:       string;
    estimado?:                     string;
}