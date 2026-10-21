import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  obtenerCampos() {
    return [
      { label: 'PHONE_NUMBER', name: 'telefono', type: 'tel', required: true },
      {
        label: 'EMAIL',
        name: 'email',
        type: 'email',
        required: true,
        pattern: '^[a-zA-Z0 -9._ %+-]+@[a-zA-Z0 -9.-]+\\.[a-zA-Z]{2,}$',
      },
      { label: 'USER_NAME', name: 'nombreUsuario', type: 'text', required: true },
      { label: 'USER', name: 'usuario', type: 'text', required: true },
      { label: 'PASSWORD', name: 'contrasena', type: 'password', required: true },
      { label: 'OCCUPATION', name: 'ocupacion', type: 'text', required: true },
      { label: 'ROLE', name: 'rol', type: 'text', required: true },
    ];
  }
}
