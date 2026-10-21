import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  obtenerCampos() {
    return [
      { label: 'NAME', name: 'nombre', type: 'text', required: true },
      { label: 'LAST_NAME', name: 'primerApellido', type: 'text', required: true },
      { label: 'SL', name: 'segundoApellido', type: 'text', required: true },
      { label: 'DATEOFBIRTH', name: 'fechaNacimiento', type: 'date', required: true },
      { label: 'GENDER', name: 'genero', type: 'text', required: true },
      { label: 'NATIONALITY', name: 'nacionalidad', type: 'text', required: true },
    ];
  }
}
