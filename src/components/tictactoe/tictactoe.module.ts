import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Tictactoe } from './tictactoe.component';


@NgModule({
  declarations: [
    Tictactoe
  ],
  imports: [
    BrowserModule,
    IonicModule
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
