import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ver-mais',
  templateUrl: './ver-mais.page.html',
  styleUrls: ['./ver-mais.page.scss'],
})
export class VerMaisPage implements OnInit {
  f: any;
  lista_planetas: Array<string> = [];
  lista_personagens: Array<string> = [];
  lista_naves: Array<string> = [];
  lista_veiculos: Array<string> = [];
  lista_especies: Array<string> = [];
  

  constructor(
    public listaService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    public loadingController: LoadingController) {  }


  ngOnInit() { }

  ionViewWillEnter() {

    this.mostraLoading();

    setTimeout(() => {
      // Acessando o storage com os valores dos filmes
      this.storage.get('infosMovie').then((ifMovie: any) => {
        if (ifMovie !== null) {
          // Faz a chamada da funcao lista nomes, que recebe um array de links url, cada um contendo uma especie, planeta.. etc
          // e retorna a lista com o nome de cada elemento no array.
          this.lista_planetas = this.listar_nomes(ifMovie.planets);
          this.lista_personagens = this.listar_nomes(ifMovie.characters);
          this.lista_naves = this.listar_nomes(ifMovie.starships);
          this.lista_veiculos = this.listar_nomes(ifMovie.vehicles);
          this.lista_especies = this.listar_nomes(ifMovie.species);
        }
      }).catch((e: any) => {
        console.error('Error getting storage movie info', e);
        this.loadingController.dismiss();
      })
    }, 100);
  }

  ionViewDidEnter(){
    setTimeout( () => {this.loadingController.dismiss();}, 2200);
  }
  
  voltar() {
    this.router.navigate(['home']);
    this.storage.remove('infosMovie');
  }

  ionViewWillLeave() {
    this.storage.remove('infosMovie');
  }


  listar_nomes(vetor: any) {
    let lista: Array<string> = [];

    for (let v of vetor) {
      this.listaService.http.get(v).subscribe((res: any) => {
        lista.push(res.name);
      });
    }
    return lista;
  }

  async mostraLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde.... Forças Jedi agindo sobre os dados!',
    });
    await loading.present();
  }


}
