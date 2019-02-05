import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Tictactoe } from './tictactoe.component';


@NgModule({
  declarations: [
    Tictactoe
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: [
    Tictactoe
  ],
  exports: [
    Tictactoe
  ],
  providers: [
  ]
})
export class TictactoeModule {}
