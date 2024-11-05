export type TCartel = {
    id:                           string;
    id_proveedor:                 number;
    formato:                      string;
    cantidad:                     number;
    ancho:                        number;
    alto:                         number;
    metros_cuadrados:             number;
    cantidad_gestionada:          number;
    metros_cuadrados_gestionados: number;
    cantidad_privada:             number;
    metros_cuadrados_privado:     number;
    cantidad_libre:               number;
    metros_cuadrados_libre:       number;
    estimado:                     Date;
    created_at:                   Date;
    updated_at:                   Date;
}