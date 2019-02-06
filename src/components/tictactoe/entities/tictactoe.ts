import { Jugador } from '../models/jugador';
import { Casilla, TIPO_FICHA } from '../models/casilla';
import { Ia } from './ia';

export class TictactoeEntity {
    public cpuIsActive = false;
    public dificulta: any = 1;
    public ganador = false;
    private jugadorDeTurno = 0;
    public jugadores: Jugador[] = [];
    private jugadas = 0;
    private tipoFichaJugador = TIPO_FICHA.TIPO_X;
    public tablero: any[] = [];
    private ia: Ia = null;

    /**
     * inicializa el tablero de juego con el que se jugara
     */
    initTablero() {
        for (let fila = 0; fila < 3; fila++) {
            this.tablero.push([]);
            for (let columna = 0; columna < 3; columna++) {
                this.tablero[fila].push(new Casilla({ id: [fila, columna] }));
            }
        }
        console.log(this.tablero);
    }

    /**
     * limpia las variables del juego
     */
    clearTictactoe() {
        this.ganador = false;
        this.jugadorDeTurno = 0;
        this.jugadas = 0;
        this.tablero = [];
    }


    /**
     * inicializa la Ia
     */
    configIa() {
        this.jugadores[1].nombre = 'cpu';
        if (this.tipoFichaJugador === TIPO_FICHA.TIPO_X) {
            this.jugadores[1].ficha = TIPO_FICHA.TIPO_O;
            this.jugadores[0].ficha = TIPO_FICHA.TIPO_X;
        } else {
            this.jugadores[0].ficha = TIPO_FICHA.TIPO_O;
            this.jugadores[1].ficha = TIPO_FICHA.TIPO_X;
            this.jugadorDeTurno = this.jugadorDeTurno === 0 ? 1 : 0;

            if (this.getJugadorTurno().nombre === 'cpu') {
                setTimeout(() => {
                    this.ia.jugadaComputadora();
                }, 1000);
            }

        }
        this.ia = new Ia();
        this.ia.setTictactoeEntity(this);
    }

    /**
     * retorna la ficha que esta usando la Ia
     */
    getFichaIa(): string {
        if (this.tipoFichaJugador === TIPO_FICHA.TIPO_X) {
            return TIPO_FICHA.TIPO_O;
        } else {
            return TIPO_FICHA.TIPO_X;
        }
    }

    /**
     * retorna la ficha que eligio el jugador
     */
    getFichaHumano(): string {
        return this.tipoFichaJugador;
    }

    setFichaHumano(ficha: string) {
        this.tipoFichaJugador = ficha;
    }

    /**
     * inicia el juego
     */
    initTictactoe() {

        this.clearJugadores();
        this.clearTictactoe();
        // agregamos los 2 jugadores
        this.addJugador(new Jugador({
            ficha: TIPO_FICHA.TIPO_X,
            nombre: 'Jugador 1'
        }));
        this.addJugador(new Jugador({
            ficha: TIPO_FICHA.TIPO_O,
            nombre: 'Jugador 2'
        }));

        this.initTablero();
        if (this.cpuIsActive) {
            this.configIa();
        }
    }

    /**
     * agrega a los jugadores
     * @param jugador 
     */
    addJugador(jugador: Jugador) {
        this.jugadores.push(jugador);
    }

    /**
     * elimina todos los jugadores del array
     */
    clearJugadores() {
        this.jugadores = [];
    }

    /**
     * retorna las jugadas
     */
    getJugadas(): number {
        return this.jugadas;
    }

    isCpuActive(): boolean {
        return this.cpuIsActive;
    }

    /**
     * 
     * @param fila fila del tablero
     * @param columna columna del tablero
     * @param cpu indica si es un movimieno de la ia
     */
    marcarJugada(fila, columna, cpu = false) {
        console.log(fila);
        console.log(columna);
        // validacion para que no ejecute la logica si
        // la casilla esta ocupada o ya hay un ganador o esta jugando la Ia
        if (this.siCasillaOcupada(fila, columna) || this.ganador ||
            (this.cpuIsActive && this.getJugadorTurno().nombre === 'cpu' && !cpu)) return;

        // se cuantan las jugadas
        this.jugadas = this.jugadas + 1;
        // marca la casilla seleccionada
        this.marcarCasila(fila, columna);
        // verifica si hay gabador
        this.ganador = this.isTictac();

        // si hay ganador no ejecuta mas logica
        if (this.ganador) return;

        this.jugadorDeTurno = this.jugadorDeTurno === 0 ? 1 : 0;

        if (this.cpuIsActive) {
            if (this.getJugadorTurno().nombre === 'cpu') {
                setTimeout(() => {
                this.ia.jugadaComputadora();
                }, 1000);
            }
        }
    }

    /**
     * verifica si la casilla esta ocupada
     * @param fila fila del tablero
     * @param columna columna del tablero
     */
    siCasillaOcupada(fila, columna) {
        return this.tablero[fila][columna].jugador !== null;
    }

    /**
     * retorna el jugador que tiene el turno
     */
    getJugadorTurno(): Jugador {
        return this.jugadores[this.jugadorDeTurno];
    }

    /**
     * marca la casilla indicada con el jugador de turno
     * @param fila fila del tablero
     * @param columna columna del tablero
     */
    marcarCasila(fila, columna) {
        this.tablero[fila][columna].ficha = this.jugadores[this.jugadorDeTurno].ficha;
        this.tablero[fila][columna].jugador = this.jugadorDeTurno;
    }

    /**
     * indica si el juego tiene ganador
     */
    isTictac(): boolean {
        // se unen en un solo array todas las lineas posible que se pueden hacer
        const lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
        for (var linea of lineas) {
            if (this.lineaCompleta(linea)) {
                return true;
            }
        }
        return false;
    }

    /**
     * verifica si la linea esta completa de un mismo tipo de ficha
     * @param linea linea que se avaluara
     */
    lineaCompleta(linea): boolean {
        let count = 0;
        let ficha = '';
        // se recorren las casillas de la linea
        for (let casilla of linea) {
            // si tiene jugador se comprueban las fichas
            if (casilla.jugador !== null) {
                if (ficha !== '') {
                    // verificamos que la casilla sea del mismo tipo
                    if (ficha === casilla.ficha) {
                        count++;
                    } else {
                        return false;
                    }
                } else {
                    // se agarra la ficha a ser avaluada en toda la linea
                    ficha = casilla.ficha;
                    count++;
                }
            } else {
                return false;
            }
        }
        return count === 3;
    }

    /**
     * retorna las diagonales del tablero
     */
    diagonales(): any[] {
        let colun = [];
        // diagonal principal
        let columna = 0;
        let res = [];
        for (let fila = 0; fila < 3; fila++) {
            res.push(this.tablero[fila][columna]);
            columna = columna + 1;
        }
        colun.push(res);
        // diagonal secundaria
        res = [];
        columna = 2;
        for (let fila = 0; fila < 3; fila++) {
            res.push(this.tablero[fila][columna]);
            columna = columna - 1;
        }
        colun.push(res);

        return colun;
    }

    /**
     * retorna las columnas del tablero
     */
    columnas(): any[] {
        let colun = [];
        for (let i = 0; i < 3; i++) {
            let res = [];
            for (let f of this.tablero) {
                res.push(f[i]);
            }
            colun.push(res);
        }
        return colun;
    }

    /**
     * verifica si la linea tiene dos ocupadas
     * @param ficha ficha a buscar
     */
    celdasVaciasDeLineasConDosOcupadas(ficha): any[] {
        // se unen en un solo array todas las lineas posible que se pueden hacer
        var lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
        var res = [];
        for (var linea of lineas) {
            var tiene = this.tieneUnaSolaDesocupada(linea, ficha);
            if (tiene.length !== 0) {
                res.push(tiene);
            }
        }
        return res;
    }

    /**
     * verifica si la linea tiene una sola desocupada
     * @param linea linea en donde se buscara
     * @param tipoFicha ficha a buscar
     */
    tieneUnaSolaDesocupada(linea, tipoFicha): any[] {
        var count = 0;
        var posicion = [];
        for (var celda of linea) {
            if (celda.jugador !== null) {
                if (celda.ficha === tipoFicha) {
                    count++;
                }
            } else {
                posicion = celda.id;
            }
        }
        if (count === 2) {
            return posicion;
        } else {
            return [];
        }
    }
}