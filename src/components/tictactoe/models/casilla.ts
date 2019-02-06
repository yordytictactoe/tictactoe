import { Jugador } from './jugador';

export class Casilla {
    id: number[];
    ficha: string;
    jugador: Jugador;

    constructor(data?: any) {
        this.id = (data && data.id) ? data.id : [];
        this.ficha = (data && data.ficha) ? data.ficha : '';
        this.jugador = (data && data.jugador) ? data.jugador : null;
    }
}

export const TIPO_FICHA = {
    TIPO_X: 'X', 
    TIPO_O: 'O'
}