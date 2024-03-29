import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lista_filmes: any;
  lista_planetas: Array<string>;
  backButtonSubscription; 

  constructor(
    public listaService: ApiService,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController,
    private platform: Platform) { }

  async ionViewWillEnter() {
    let loading = await this.loadingController.create({
      message: 'Aguarde.... Forças Jedi agindo sobre os dados!',
    });
    await loading.present();

    this.listaService.listar_filmes().then(async filmes_retorno => {
      this.lista_filmes = filmes_retorno;

      await this.loadingController.dismiss();

    }).catch(async (e: any) => {
      console.error('Error', e);
      await this.loadingController.dismiss();
    });
  }


  verMais(infosMovie) {

    console.log('Data infos movie -> ', infosMovie);

    // Cria o storage de sessão para salvar os dados
    this.storage.set('infosMovie', infosMovie);
    this.router.navigateByUrl('ver-mais');
  }


  // async mostraLoading() {
    
  // }

}
