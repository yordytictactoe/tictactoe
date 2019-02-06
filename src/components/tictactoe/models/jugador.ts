export class Jugador {
    ficha: string;
    nombre: string;

    constructor(data?: any) {
        this.ficha = (data && data.ficha) ? data.ficha : '';
        this.nombre = (data && data.nombre) ? data.nombre : '';
    }
}