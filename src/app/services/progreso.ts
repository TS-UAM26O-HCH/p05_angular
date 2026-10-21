import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgresoService {
  private pasoActual = new BehaviorSubject<number>(0);
  private pasosCompletados = new BehaviorSubject<{ [clave: number]: boolean }>({});

  pasoActual$ = this.pasoActual.asObservable();
  pasosCompletados$ = this.pasosCompletados.asObservable();

  establecerPasoActual(paso: number) {
    this.pasoActual.next(paso);
  }

  completarPaso(paso: number) {
    const actuales = this.pasosCompletados.value;
    this.pasosCompletados.next({ ...actuales, [paso]: true });
  }

  obtenerPasosCompletados() {
    return this.pasosCompletados.value;
  }
}
