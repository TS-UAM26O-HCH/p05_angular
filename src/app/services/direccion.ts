import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  obtenerCampos() {
    return [
      { label: 'ZIP_CODE', name: 'codigoPostal', type: 'text', required: true },
      { label: 'STATE', name: 'estado', type: 'text', required: true },
      { label: 'CITY_TOWN', name: 'ciudad', type: 'text', required: true },
      { label: 'COLOGNE', name: 'colonia', type: 'text', required: true },
      { label: 'STREET', name: 'calle', type: 'text', required: true },
      { label: 'OUTER_NUMBER', name: 'numeroExterior', type: 'text', required: true },
      { label: 'INSIDE_NUMBER', name: 'numeroInterior', type: 'text', required: false },
      { label: 'REFERENCE', name: 'referencia', type: 'text', required: false },
    ];
  }
}
