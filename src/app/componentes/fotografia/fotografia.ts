import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProgresoService } from '../../services/progreso';

@Component({
  selector: 'app-fotografia',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './fotografia.html',
  styleUrl: './fotografia.css',
})
export class Fotografia {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private progresoService: ProgresoService,
  ) {}

  cambiarIdioma(lang: string) {
    this.translate.use(lang);
  }

  regresar() {
    this.router.navigate(['/registro']);
  }

  continuar() {
    this.progresoService.completarPaso(3);
    this.router.navigate(['/registro']);
  }
}
