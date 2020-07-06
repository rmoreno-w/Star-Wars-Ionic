import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLbase } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lista_planetas: Array<string>;

  constructor(public http: HttpClient) {
  }

  
  listar_filmes() {
    return new Promise((resolve, reject) => {
      this.http.get(URLbase + "films").subscribe((res: any) => {
        console.log('Response -> ', res.results);
        resolve(res.results)
      }, erro => { console.error(erro)
        reject(erro)
       })


    });
  }

    
  listar_planetas() {
    return new Promise((rs, rj)=>{

    });
    // for (let p of f.planets) {
    //   this.http.get(p).subscribe((res: any) => {
    //     this.lista_planetas.push(res.name); //Seta a lista de planetas com o retorno dos filmes
    //     console.log('Planetas na lista ->', this.lista_planetas);
    //   });
    // }
    // return this.lista_planetas;
  }
    // listar_x(URL: string) {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(URL).subscribe((res: any) => {
  //       console.log('Response -> ', res.results);
  //       resolve(res.results)
  //     }, erro => { console.error(erro)
  //       reject(erro)
  //      })


  //   });
  // }
  // listar_planetas(planetas: any) {
  //   for (const p of planetas) {
  //     return new Promise((resolve, reject) => {
  //       this.http.get(p).subscribe((res: any) => {
  //         console.log('Response -> ', res.name);
  //         resolve(this.lista_planetas.push(res.name))
  //       }, erro => {
  //         console.error(erro)
  //         reject(erro)
  //       })

  //     });
  //   }
  // }
  }
