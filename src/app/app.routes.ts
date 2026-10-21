import { Routes } from '@angular/router';
import { Bienvenido } from './componentes/bienvenido/bienvenido';
import { Principal } from './componentes/principal/principal';
import { Registro } from './componentes/registro/registro';
import { Personal } from './componentes/personal/personal';
import { Cuenta } from './componentes/cuenta/cuenta';
import { Direccion } from './componentes/direccion/direccion';
import { Fotografia } from './componentes/fotografia/fotografia';

export const routes: Routes = [
  { path: 'bienvenido', component: Bienvenido },
  { path: 'principal', component: Principal },
  { path: 'registro', component: Registro }, //ruta para la interfaz de registro
  { path: 'personal', component: Personal }, //ruta para la informacion personal
  { path: 'cuenta', component: Cuenta }, //ruta para la interfaz de cuenta
  { path: 'direccion', component: Direccion }, //ruta para la interfaz de direccion
  { path: 'fotografia', component: Fotografia }, //ruta para la interfaz defotografia
  { path: '', redirectTo: '/bienvenido', pathMatch: 'full' },
];
