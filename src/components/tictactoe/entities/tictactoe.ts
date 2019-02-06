import { Jugador } from '../models/jugador';
import { Casilla } from '../models/casilla';

export class TictactoeEntity {
    cpuIsActive = false;
    ganador = false;
    jugadorDeTurno = 0;
    jugadores: Jugador[] = [];
  
    jugadas = 0;
  
    tablero: any[] = [];

    initTablero() {
        for(let fila = 0; fila < 3; fila++) {
            this.tablero.push([]);
            for(let columna = 0; columna < 3; columna++) {
                this.tablero[fila].push(new Casilla({id: [fila, columna]}));
            }
        }
        console.log(this.tablero);
    }

    addJugador(jugador: Jugador) {
        this.jugadores.push(jugador);
    }
}