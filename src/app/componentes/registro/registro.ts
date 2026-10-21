import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RegistroService } from '../../services/registro';
import { ProgresoService } from '../../services/progreso';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
  pasos: any[] = [];
  pasosComp: { [clave: number]: boolean } = {};
  pasoActual = 0;

  constructor(
    private translate: TranslateService,
    private registroService: RegistroService,
    private progresoService: ProgresoService,
  ) {}

  ngOnInit() {
    this.pasos = this.registroService.obtenerPasos();
    this.progresoService.pasoActual$.subscribe((paso) => (this.pasoActual = paso));
    this.progresoService.pasosCompletados$.subscribe(
      (completados) => (this.pasosComp = completados),
    );
  }

  cambiarIdioma(lang: string) {
    this.translate.use(lang);
  }
}
