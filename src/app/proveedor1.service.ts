import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({

  providedIn: 'root'

})
export class Proveedor1Service {

  constructor(public http: HttpClient) {
    console.log('holi');
   }

   obtenerDatos(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
   }
}
