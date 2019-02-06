import { Component, OnInit, Input } from '@angular/core';
import { TictactoeEntity } from './entities/tictactoe';

@Component({
  selector: 'page-tictactoe',
  templateUrl: 'tictactoe.html'
})
export class Tictactoe implements OnInit {
  @Input() backgroundColor1 = '#2219af';
  @Input() backgroundColor2 = '#c8cff0';
  @Input() casillaSize = 57;
  @Input() bgCasillaSize = '#ffffff42';
  @Input() colorCasillas = '#000';
  @Input() fontSizeCasillas = 14;
  public tictactoeEntity: TictactoeEntity = new TictactoeEntity();
  public activeIa = true;
  public dificulta = 1;

  constructor() {

  }

  ngOnInit() {
    // por defecto se selecciona la ficha X
    this.selecionarFichaJugador('X');
  }

  /**
   * retorna el color de fondo
   */
  getBackground(): string  {
    return 'linear-gradient(to bottom right, ' + this.backgroundColor1 +' 0%, ' + this.backgroundColor2 +' 100%)';
  }

  /**
   * retorna el tamaño de las casillas
   */
  getCasillaSize(): string {
    return this.casillaSize + 'px';
  }

  /**
   * retorna tamaño de texto de las casillas
   */
  getFontSize(): string {
    return this.fontSizeCasillas + 'px';
  }

  /**
   *
   * @param ficha selecciona la ficha del jugador
   */
  selecionarFichaJugador(ficha) {
    // inicializamos el juego
    if (this.activeIa) {
      this.tictactoeEntity.cpuIsActive = true;
      this.tictactoeEntity.setFichaHumano(ficha);
    }
    this.tictactoeEntity.initTictactoe();
  }

  /**
   * selecciona la dificulta
   * @param event dificulta 1 facil, 2 medio, 0 con otro jugador
   */
  selectDificulta(event) {
    if (event === '0') {
      this.activeIa = false;
      this.tictactoeEntity.cpuIsActive = this.activeIa;
      this.reset();
    } else {
      this.activeIa = true;
      this.tictactoeEntity.cpuIsActive = this.activeIa;
      this.tictactoeEntity.dificulta = Number(event);
      this.reset();
    }
  }

  /**
   * evento del usuario al hacer click en una casilla
   * @param fila fila del tablero
   * @param columna columna del tablero
   */
  usuarioSeleccion(fila, columna) {
    this.tictactoeEntity.marcarJugada(fila, columna);
  }

  /**
   * resetea el tablero
   */
  reset() {
    this.tictactoeEntity.setFichaHumano('X');
    this.tictactoeEntity.initTictactoe();
  }
}
