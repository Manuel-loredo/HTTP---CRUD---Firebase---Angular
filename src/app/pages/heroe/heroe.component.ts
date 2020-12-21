import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import  Swal  from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
                private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    if(id !== 'nuevo') {
    this.heroesService.getheroe(id)
                        .subscribe((resp: HeroeModel) => {
                         this.heroe = resp;
                         this.heroe.id = id;
                        });
                      
    }
  }

  
  guardar(form: NgForm) {

    if(form.invalid) {
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando Informacion',
      allowOutsideClick: false
    });

    let peticion: Observable<any>;
  
    //muestra un loading
    Swal.showLoading();

  if(this.heroe.id){
    peticion = this.heroesService.actualizarHeroe(this.heroe);              

  } else {
    peticion = this.heroesService.crearHeroe( this.heroe);

  }

  peticion.subscribe( resp => {

    Swal.fire({
      icon: 'success',
      title: this.heroe.nombre,
      text: 'Se actualizo correctamente',
    });

  });
   
  }

}
