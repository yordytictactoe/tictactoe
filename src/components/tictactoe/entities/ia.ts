import { TictactoeEntity } from './tictactoe';
export class Ia {

    constructor() {
    }

    private tictactoeEntity: TictactoeEntity = null;

    /**
     * se setea el juego para que la ia pueda buscar sus jugadas
     * @param tictactoeEntity 
     */
    setTictactoeEntity(tictactoeEntity: TictactoeEntity) {
        this.tictactoeEntity = tictactoeEntity;
    }

    /**
     * funcion que se encarga de hacer las jugadas de la Ia
     */
    jugadaComputadora() {
        // si no se ah terminado el juego
        if (this.tictactoeEntity.getJugadas() < 9) {
            // busca una posicion desocupada
            var posicion = this.desocupada();

            // busca las posibles posiciones para ganar
            var posiblesParaGanar = this.tictactoeEntity.celdasVaciasDeLineasConDosOcupadas(this.tictactoeEntity.getFichaIa());
            // busca las posibles posiciones para bloquear
            var posiblesParaBloquear = this.tictactoeEntity.celdasVaciasDeLineasConDosOcupadas(this.tictactoeEntity.getFichaHumano());

            if (posiblesParaGanar.length >= 1) {
                posicion = posiblesParaGanar[Math.floor(Math.random() * posiblesParaGanar.length)];
            } else if (posiblesParaBloquear.length >= 1) {
                posicion = posiblesParaBloquear[Math.floor(Math.random() * posiblesParaBloquear.length)];
            } else if(this.tictactoeEntity.dificulta === 1 || this.tictactoeEntity.dificulta === '1'){
               /*  if (!this.tictactoeEntity.siCasillaOcupada(1, 1)) posicion = [1, 1]; */
            }

            //una vez que eligió, pone la ficha en el tablero.
            var fila = posicion[0];
            var columna = posicion[1];
            this.tictactoeEntity.marcarJugada(fila, columna, true);
        }
    }

    /**
     * funcion que se encarga de buscar una casilla libre en el tablero
     */
    desocupada(): any {

        const esquinas = [];

        if(this.tictactoeEntity.dificulta !== 1 && this.tictactoeEntity.dificulta !== '1') {
            // diciculta medio se buscan las casillas de las esquinas
            if (!this.tictactoeEntity.siCasillaOcupada(0, 0)) {
                esquinas.push([0, 0]);
            }
            if (!this.tictactoeEntity.siCasillaOcupada(0, 2)) {
                esquinas.push([0, 2]);
            }
            if (!this.tictactoeEntity.siCasillaOcupada(2, 0)) {
                esquinas.push([2, 0]);
            }
            if (!this.tictactoeEntity.siCasillaOcupada(2, 2)) {
                esquinas.push([2, 2]);
            }
        }
        let desocupadas = [];
        if (!esquinas.length) { // si no hay posiciones libres en las esquinas busca cualquier otra
            for (let i = 0; i < this.tictactoeEntity.tablero.length; i++) {
                for (let j = 0; j < 3; j++) {
                    if (!this.tictactoeEntity.siCasillaOcupada(i, j)) {
                        desocupadas.push([i, j]);
                    }
                }
            }
        } else {
            desocupadas = esquinas;
        }
        let index = 0;
        if (desocupadas.length > 1) {
            // selecciona una casilla al azar
            index = this.aleatorio(0, desocupadas.length - 1);
        }

        return desocupadas[index];
    }

    /**
     * retorna un nuero de forma aleatoria en el rango
     * @param minimo valor minimo
     * @param maximo valor maximo
     */
    aleatorio(minimo,maximo): number {
        return Math.round(Math.random() * (maximo - minimo) + minimo);
    }
}