import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public alertController: AlertController
  ) {
    this.initializeApp();
    this.checkBackButton();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Captura de evento do botão voltar do android
   */
  async checkBackButton() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      try {
        const currentPageApp = this.router.url;
        console.log('\nPágina atual -> ', currentPageApp);

        switch (currentPageApp) {
          case '/home':
            const alert = await this.alertController.create({
              header: 'ATENÇÃO!!!',
              message: 'Deseja sair do app?',
              backdropDismiss: false,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    navigator['app'].exitApp();
                  }
                },
                {
                  text: 'Cancelar'
                }
              ]
            });
            await alert.present();
            break;

          case '/ver-mais':
            this.router.navigate(['home']);

        }

      } catch (error) {
        console.error('Error back-button', error);
      }

    });
  }
}
