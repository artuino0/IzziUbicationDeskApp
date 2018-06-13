import { Component } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lat: number;
  lng: number;

  init = false;

  promotors: Promotor[] = [];
  siguiendoA: string = null;
  siguiendoNombre: string = null;


  constructor(db: AngularFirestore) {
    db.collection('izzi-tracker').valueChanges()
        .subscribe( ( data: Promotor[] ) => {

          this.promotors = data;
          console.log(data)

          if ( !this.init ) {
            this.lat = data[0].lat;
            this.lng = data[0].lng;
            this.init = true;
          }

          if ( this.siguiendoA ) {

            data.forEach( promotor => {

              if ( promotor.clave === this.siguiendoA ) {
                this.lat = promotor.lat;
                this.lng = promotor.lng;
              }

            });

          }


        });
  }


  seguir( promotor: Promotor ) {
    
    this.siguiendoA = promotor.clave;
    this.siguiendoNombre = promotor.nombre;

    this.lat = promotor.lat;
    this.lng = promotor.lng;

  }

  dejarDeSeguir() {
    this.siguiendoA = null;
    this.siguiendoNombre = null;
  }

}



interface Promotor {
  nombre: string;
  clave: string;
  lat: number;
  lng: number;
}
