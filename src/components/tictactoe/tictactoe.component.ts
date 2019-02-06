import { Component, OnInit } from '@angular/core';
import { TictactoeEntity } from './entities/tictactoe';

@Component({
  selector: 'page-tictactoe',
  templateUrl: 'tictactoe.html'
})
export class Tictactoe implements OnInit {
  public tictactoeEntity: TictactoeEntity = new TictactoeEntity();

  constructor() {
    
  }

  ngOnInit() {
    this.selecionarFichaJugador('O');
  }
  
  selecionarFichaJugador(ficha) {
    // inicializamos el juego
    this.tictactoeEntity.initTictactoe();
  }

  /**
   * evento del usuario al hacer click en una casilla
   * @param fila fila del tablero
   * @param columna columna del tablero
   */
  usuarioSeleccion(fila, columna) {
    this.tictactoeEntity.marcarJugada(fila, columna);
  }

  reset() {
    this.tictactoeEntity.initTictactoe();
  }
}
