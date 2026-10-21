import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private router: Router) {}

  obtenerPasos() {
    return [
      {
        icono: '/iconos/Usuario.svg',
        texto: 'PERSONAL',
        alt: 'PERSONAL',
        accion: () => this.router.navigate(['/personal']),
      },
      {
        icono: '/iconos/CorreoElectronico.svg',
        texto: 'ACCOUNT',
        alt: 'ACCOUNT',
        accion: () => this.router.navigate(['/cuenta']),
      },
      {
        icono: '/iconos/add.svg',
        texto: 'ADDRESS',
        alt: 'ADDRESS',
        accion: () => this.router.navigate(['/direccion']),
      },
      {
        icono: '/iconos/Fotografiia.svg',
        texto: 'PICTURE',
        alt: 'PICTURE',
        accion: () => this.router.navigate(['/fotografia']),
      },
    ];
  }
}
