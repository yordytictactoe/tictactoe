import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public bgColor1 = '#50a3a2';
  public bgColor2 = '#53e3a6';
  public bgCasillas = '#ffffff42';
  public colorCasillas = '#000';
  public tamanoCasilla = 57;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.getSaveConfig();
  }

  /**
   * busca las configuraciones guardadas en localStorage
   */
  getSaveConfig() {
    if (localStorage.getItem('bgColor1')) {
      this.bgColor1 = localStorage.getItem('bgColor1');
    }
    if (localStorage.getItem('bgColor2')) {
      this.bgColor2 = localStorage.getItem('bgColor2');
    }
    if (localStorage.getItem('tamanoCasilla')) {
      this.tamanoCasilla = Number(localStorage.getItem('tamanoCasilla'));
    }
    if (localStorage.getItem('bgCasillas')) {
      this.bgCasillas = localStorage.getItem('bgCasillas');
    }
    if (localStorage.getItem('colorCasillas')) {
      this.colorCasillas = localStorage.getItem('colorCasillas');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // clave repositorio: prueba147852369
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  saveColor(property, value){
    localStorage.setItem(property, value);
  }
}
