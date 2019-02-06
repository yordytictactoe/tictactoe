import { Component, ViewChild } from '@angular/core';
import { TictactoeEntity } from './entities/tictactoe';

@Component({
  selector: 'page-tictactoe',
  templateUrl: 'tictactoe.html'
})
export class Tictactoe {
  public tictactoeEntity: TictactoeEntity = new TictactoeEntity();

  constructor() {
    this.tictactoeEntity.initTablero();
  }
}
