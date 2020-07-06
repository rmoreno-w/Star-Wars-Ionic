import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lista_filmes: any;
  lista_planetas: Array<string>;
  constructor(public listaService: ApiService, private router: Router, private storage: Storage, public loadingController: LoadingController) { }

  ionViewWillEnter() {
    this.mostraLoading();
    this.listaService.listar_filmes().then(filmes_retorno => {
      this.lista_filmes = filmes_retorno;

      setTimeout(() => {
        this.loadingController.dismiss();
      }, 1500);

    }).catch((e: any) => {
      console.error('Error', e);
      this.loadingController.dismiss();
    });
  }


  verMais(infosMovie) {

    console.log('Data infos movie -> ', infosMovie);

    // Cria o storage de sessão para salvar os dados
    this.storage.set('infosMovie', infosMovie);


    // this.router.navigate(['ver-mais'], { queryParams: { mvInfo: infosMovie } });
    this.router.navigateByUrl('ver-mais');



  }
  async mostraLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde.... Forças Jedi agindo sobre os dados!',
    });
    await loading.present();
  }

}
