# PrimeraAplicación

Aplicación web desarrollada con **Angular 22** (standalone components) que incluye una pantalla de **inicio de sesión**, un **menú principal** y un **flujo de registro por pasos**, con soporte de **internacionalización (i18n)** en español e inglés y **renderizado del lado del servidor (SSR)** mediante Express.

> **Nota importante:** el inicio de sesión es únicamente visual (no hay backend ni autenticación real). Al enviar el formulario solo se muestra una alerta. Para llegar a la pantalla principal **debes cambiar manualmente la URL** de `/bienvenido` a `/principal`. El flujo de registro tampoco guarda información: los formularios no envían datos a ningún servidor.

> **Estado del proyecto:** esta es la entrega correspondiente a la **Parte 5** de la práctica. La pantalla de registro y sus cuatro pasos ya están implementados, pero varias acciones siguen pendientes (ver [Estado actual y pendientes](#estado-actual-y-pendientes)).

---

## Tabla de contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
  - [Servidor de desarrollo](#servidor-de-desarrollo)
  - [Navegación entre pantallas](#navegación-entre-pantallas)
  - [Compilación](#compilación)
  - [SSR (producción)](#ssr-producción)
  - [Pruebas unitarias](#pruebas-unitarias)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas](#rutas)
- [Funcionalidades](#funcionalidades)
  - [Pantalla de bienvenida (`/bienvenido`)](#pantalla-de-bienvenida-bienvenido)
  - [Pantalla principal (`/principal`)](#pantalla-principal-principal)
  - [Flujo de registro (`/registro`)](#flujo-de-registro-registro)
  - [Servicios](#servicios)
  - [Internacionalización](#internacionalización)
- [Estado actual y pendientes](#estado-actual-y-pendientes)
- [Scripts disponibles](#scripts-disponibles)
- [Recursos estáticos](#recursos-estáticos)
- [Solución de problemas](#solución-de-problemas)

---

## Requisitos

- **Node.js** 20 o superior (recomendado 22+)
- **pnpm** (el proyecto usa `pnpm@12.11.2` como gestor de paquetes)

```bash
npm install -g pnpm
```

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <URL-del-repositorio>
cd primeraAplicacion
pnpm install
```

## Uso

### Servidor de desarrollo

```bash
pnpm start
```

o, de forma equivalente:

```bash
pnpm ng serve
```

Abre el navegador en **http://localhost:4200/**. La ruta raíz `/` redirige automáticamente a `/bienvenido`.

La aplicación se recarga automáticamente al modificar los archivos fuente.

### Navegación entre pantallas

El inicio de sesión **no está automatizado**: el formulario no redirige al menú principal aunque las credenciales sean válidas.

1. Abre **http://localhost:4200/bienvenido** (o simplemente `/`).
2. Una vez en la pantalla de bienvenida, **cambia manualmente la URL** en la barra del navegador a:

   ```
   http://localhost:4200/principal
   ```

3. Para regresar, cambia la URL a `/bienvenido` o haz clic en la tarjeta **Cerrar sesión** dentro del menú principal.

Desde la pantalla principal, la tarjeta **Registro** navega a `/registro`, donde comienza el flujo de registro. También puedes entrar directamente a cualquier paso (`/personal`, `/cuenta`, `/direccion`, `/fotografia`).

### Compilación

```bash
pnpm build
```

Los artefactos se generan en `dist/primeraAplicacion/`. Por defecto se usa la configuración de producción (optimizada).

Para una compilación en modo desarrollo con recarga de cambios:

```bash
pnpm watch
```

### SSR (producción)

El proyecto está configurado con SSR (`outputMode: "server"`). Tras compilar:

```bash
pnpm build
pnpm serve:ssr:primeraAplicacion
```

El servidor Express escucha por defecto en **http://localhost:4000**. Puedes cambiar el puerto con la variable de entorno `PORT`:

```bash
PORT=8080 pnpm serve:ssr:primeraAplicacion
```

### Pruebas unitarias

```bash
pnpm test
```

Se ejecutan con [Vitest](https://vitest.dev/) mediante el builder `@angular/build:unit-test`.

Cada componente y servicio tiene un archivo `*.spec.ts` con pruebas mínimas de creación (`should create`). No hay pruebas de comportamiento ni pruebas E2E.

---

## Estructura del proyecto

```text
primeraAplicacion/
├── public/                                    # Recursos estáticos servidos tal cual
│   ├── favicon.ico
│   ├── iconos/                                # Iconos SVG de la interfaz
│   │   ├── account-avatar-profile-user-6-svgrepo-com.svg
│   │   ├── add.svg
│   │   ├── AvisoPrivacidad.svg
│   │   ├── Background.svg
│   │   ├── Cerrar sesion.svg
│   │   ├── CorreoElectronico.svg
│   │   ├── Fotografiia.svg
│   │   ├── Notificaciones.svg
│   │   ├── Pantera.svg
│   │   ├── Registro.svg
│   │   ├── retroceder.svg
│   │   ├── Usuario.svg
│   │   └── Visualizar.svg
│   └── lenguajes/                             # Traducciones i18n
│       ├── es.json                            # Español
│       └── en.json                            # Inglés
├── src/
│   ├── app/
│   │   ├── componentes/
│   │   │   ├── bienvenido/                    # Pantalla de inicio de sesión
│   │   │   ├── principal/                     # Menú principal con tarjetas
│   │   │   ├── registro/                      # Flujo de registro (4 pasos)
│   │   │   ├── personal/                      # Paso 1: datos personales
│   │   │   ├── cuenta/                        # Paso 2: datos de cuenta
│   │   │   ├── direccion/                     # Paso 3: dirección
│   │   │   └── fotografia/                    # Paso 4: fotografía
│   │   │       # Cada carpeta contiene: <nombre>.ts, .html, .css y .spec.ts
│   │   ├── services/
│   │   │   ├── registro.ts                    # Definición de los pasos del registro
│   │   │   ├── personal.ts                    # Campos del formulario personal
│   │   │   ├── cuenta.ts                      # Campos del formulario de cuenta
│   │   │   ├── direccion.ts                   # Campos del formulario de dirección
│   │   │   ├── progreso.ts                    # Estado del progreso del registro
│   │   │   └── *.spec.ts
│   │   ├── app.ts                             # Componente raíz
│   │   ├── app.html                           # Plantilla raíz (<router-outlet />)
│   │   ├── app.css
│   │   ├── app.config.ts                      # Configuración del cliente (router, HTTP, i18n)
│   │   ├── app.config.server.ts               # Configuración del servidor (SSR)
│   │   ├── app.routes.ts                      # Definición de rutas del cliente
│   │   ├── app.routes.server.ts               # Modo de renderizado del servidor
│   │   └── app.spec.ts
│   ├── main.ts                                # Punto de entrada del navegador
│   ├── main.server.ts                         # Punto de entrada del servidor
│   ├── server.ts                              # Servidor Express para SSR
│   ├── index.html                             # Documento HTML principal
│   └── styles.css                             # Estilos globales
├── cypress/
│   └── downloads/                             # Carpeta vacía; Cypress aún no está configurado
├── .vscode/                                   # Configuración de VS Code (tareas, launch)
├── angular.json                               # Configuración de Angular CLI
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .prettierrc                                # Configuración de formato de código
└── README.md
```

> Las carpetas `node_modules/`, `dist/` y `.angular/cache/` se generan automáticamente y no forman parte del código fuente.

---

## Rutas

| Ruta          | Componente   | Descripción                                        |
| ------------- | ------------ | -------------------------------------------------- |
| `/`           | —            | Redirige a `/bienvenido`                           |
| `/bienvenido` | `Bienvenido` | Pantalla de inicio de sesión                       |
| `/principal`  | `Principal`  | Menú principal con tarjetas de opciones            |
| `/registro`   | `Registro`   | Pantalla del flujo de registro y progreso de pasos |
| `/personal`   | `Personal`   | Paso 1: formulario de datos personales             |
| `/cuenta`     | `Cuenta`     | Paso 2: formulario de datos de la cuenta           |
| `/direccion`  | `Direccion`  | Paso 3: formulario de dirección                    |
| `/fotografia` | `Fotografia` | Paso 4: instrucciones para la fotografía           |

La navegación de `/bienvenido` a `/principal` es **manual** (ver [Navegación entre pantallas](#navegación-entre-pantallas)). El resto de rutas se alcanzan desde la tarjeta **Registro** o desde los pasos del flujo.

---

## Funcionalidades

### Pantalla de bienvenida (`/bienvenido`)

- Formulario reactivo con los campos **correo electrónico** y **contraseña**.
- Validaciones:
  - Campos obligatorios.
  - Formato de correo mediante expresión regular.
- Botón con icono para **mostrar/ocultar la contraseña**.
- Mensajes de error traducidos al idioma activo.
- Casilla **Recuérdame** (solo visual, no se persiste).
- Botones para cambiar entre **Español** e **Inglés**.
- Al enviar el formulario:
  - Si es válido, se muestra la alerta `Se inició sesión correctamente`.
  - Si no es válido, se marcan todos los campos como tocados y se muestra `Datos incorrectos`.
  - Los textos de las alertas están fijos en español.

### Pantalla principal (`/principal`)

Menú con seis tarjetas:

| Tarjeta             | Acción                 |
| ------------------- | ---------------------- |
| Mi cuenta           | Sin acción (pendiente) |
| Registro            | Navega a `/registro`   |
| Notificaciones      | Sin acción (pendiente) |
| ChatBot             | Sin acción (pendiente) |
| Aviso de privacidad | Sin acción (pendiente) |
| Cerrar sesión       | Navega a `/bienvenido` |

También incluye el selector de idioma **Español / English**.

### Flujo de registro (`/registro`)

La pantalla `/registro` muestra una barra de progreso con cuatro pasos. Cada paso se puede abrir haciendo clic en su tarjeta:

| Paso | Tarjeta    | Ruta          | Contenido                                                                 |
| ---- | ---------- | ------------- | ------------------------------------------------------------------------- |
| 1    | Personal   | `/personal`   | Nombre, apellidos, fecha de nacimiento, género y nacionalidad             |
| 2    | Cuenta     | `/cuenta`     | Teléfono, correo, nombre de usuario, usuario, contraseña, ocupación y rol |
| 3    | Dirección  | `/direccion`  | Código postal, estado, ciudad, colonia, calle, números y referencia       |
| 4    | Fotografía | `/fotografia` | Instrucciones para tomar o subir una fotografía                           |

Comportamiento de los pasos:

- Los formularios se generan dinámicamente a partir de la definición de campos de cada servicio (`PersonalService`, `CuentaService`, `DireccionService`).
- Todos los campos marcados como obligatorios usan `Validators.required`; el correo de la cuenta añade además una validación de formato.
- El botón de envío permanece deshabilitado mientras el formulario sea inválido y los errores se muestran al tocar cada campo.
- Al enviar un formulario válido se marca el paso como completado, se avanza el paso actual y se navega al siguiente:
  - `/personal` → `/cuenta`
  - `/cuenta` → `/direccion`
  - `/direccion` → `/fotografia`
  - `/fotografia` (botón **Continuar**) → `/registro`
- Cada pantalla de paso incluye un botón para **regresar** a `/registro`.
- Los círculos de la barra de progreso se muestran completados (✓) o como paso actual según el estado de `ProgresoService`.
- El botón **Registrar** de `/registro` todavía no tiene ninguna acción asociada.

> El progreso se guarda únicamente en memoria. Al recargar la página se reinicia, y los datos capturados en los formularios **no se conservan** ni se envían a ningún backend.

### Servicios

| Servicio           | Responsabilidad                                                             |
| ------------------ | --------------------------------------------------------------------------- |
| `RegistroService`  | Devuelve la definición de los cuatro pasos del registro y su navegación.    |
| `PersonalService`  | Define los campos del formulario de datos personales.                       |
| `CuentaService`    | Define los campos del formulario de cuenta (incluye el patrón de correo).   |
| `DireccionService` | Define los campos del formulario de dirección.                              |
| `ProgresoService`  | Mantiene el paso actual y los pasos completados mediante `BehaviorSubject`. |

`ProgresoService` expone `pasoActual$`, `pasosCompletados$`, `establecerPasoActual()`, `completarPaso()` y `obtenerPasosCompletados()`.

### Internacionalización

- Se usa `@ngx-translate/core` con `@ngx-translate/http-loader`.
- Los archivos de traducción viven en `public/lenguajes/` y se cargan desde `/lenguajes/<idioma>.json`.
- Idioma por defecto: **español** (`es`), con `es` como idioma de respaldo.
- Para agregar un idioma:
  1. Crea `public/lenguajes/<codigo>.json` con las mismas claves.
  2. Añade un botón que llame a `cambiarIdioma('<codigo>')` en las plantillas.
- Claves disponibles: `TITLE`, `LOGIN`, `EMAIL`, `PASSWORD`, `REMEMBER_ME`, `ACCESS`, `FORGOT_PASSWORD`, `REQUIERED`, `MY_ACCOUNT`, `REGISTER`, `NOTIFICATIONS`, `CHATBOT`, `PRIVACY_NOTICE`, `LOGOUT`, `REG`, `PERSONAL`, `ACCOUNT`, `ADDRESS`, `PICTURE`, `NAME`, `LAST_NAME`, `SL`, `DATEOFBIRTH`, `GENDER`, `NATIONALITY`, `PHONE_NUMBER`, `USER_NAME`, `USER`, `OCCUPATION`, `ROLE`, `ZIP_CODE`, `STATE`, `CITY_TOWN`, `COLOGNE`, `STREET`, `OUTER_NUMBER`, `INSIDE_NUMBER`, `REFERENCE`, `CONTINUE`.
- El selector de idioma aparece en `/bienvenido`, `/principal` y `/registro`. Los pasos del flujo no lo incluyen, aunque conservan el idioma elegido.
- La clave `REQUIERED` está escrita así (con error ortográfico) en el código y en los JSON; si se renombra, hay que actualizarla en las plantillas.
- Textos aún sin traducir: las alertas de `/bienvenido` y las indicaciones de `/fotografia` están escritas directamente en español.

---

## Estado actual y pendientes

Funcionalidad que **todavía falta** o está incompleta:

- **Autenticación real:** no existe backend, sesión ni validación de credenciales. `/bienvenido` solo muestra alertas y no redirige a `/principal`.
- **Navegación automática tras iniciar sesión:** por ahora hay que cambiar la URL manualmente.
- **Persistencia de datos:** los formularios de registro no guardan la información en ningún servicio, base de datos ni almacenamiento local.
- **Botón "Registrar"** de `/registro`: no tiene acción asignada.
- **Carga de fotografía:** `/fotografia` solo muestra instrucciones e imágenes; no hay `<input type="file">`, vista previa ni subida de archivos.
- **Envío final del registro:** al terminar los cuatro pasos se regresa a `/registro`; no hay resumen ni confirmación.
- **Tarjetas del menú principal:** _Mi cuenta_, _Notificaciones_, _ChatBot_ y _Aviso de privacidad_ no tienen acción.
- **Selector de idioma en los pasos del registro:** no está incluido en `/personal`, `/cuenta`, `/direccion` ni `/fotografia`.
- **Traducciones completas:** las alertas de inicio de sesión y el texto de la pantalla de fotografía están en español fijo.
- **Pruebas:** solo existen pruebas mínimas de creación. Las pruebas de los servicios (`src/app/services/*.spec.ts`) importan el componente en lugar del servicio, por lo que deben corregirse. No hay pruebas E2E configuradas: `cypress/` solo contiene la carpeta `downloads/`.
- **Manejo de errores y estados de carga:** no se contemplan para la carga de traducciones ni para futuras llamadas HTTP.

---

## Scripts disponibles

| Comando                            | Descripción                                        |
| ---------------------------------- | -------------------------------------------------- |
| `pnpm start` / `pnpm ng serve`     | Inicia el servidor de desarrollo en el puerto 4200 |
| `pnpm build`                       | Compila la aplicación para producción              |
| `pnpm watch`                       | Compila en modo desarrollo y observa cambios       |
| `pnpm test`                        | Ejecuta las pruebas unitarias con Vitest           |
| `pnpm serve:ssr:primeraAplicacion` | Sirve la compilación SSR con Express (puerto 4000) |

Generación de componentes con Angular CLI:

```bash
pnpm ng generate component componentes/nombre-componente
```

Para ver todos los esquemas disponibles:

```bash
pnpm ng generate --help
```

---

## Recursos estáticos

Todo lo que se coloque en `public/` se sirve desde la raíz del sitio:

- Iconos: `/iconos/<nombre>.svg`
- Traducciones: `/lenguajes/<idioma>.json`

Esto está configurado en `angular.json` dentro de `projects.primeraAplicacion.architect.build.options.assets`. Actualmente no existe una carpeta `public/imagenes/`; si necesitas imágenes, créala y referencia los archivos como `/imagenes/<archivo>`.

---

## Solución de problemas

- **La raíz `/` no carga:** verifica que el servidor esté corriendo en http://localhost:4200 y que hayas ejecutado `pnpm install`.
- **No veo la pantalla principal después de iniciar sesión:** es el comportamiento esperado; cambia la URL manualmente a `/principal`.
- **Las traducciones no cargan:** confirma que `public/lenguajes/es.json` y `en.json` existan y que la aplicación se sirva desde la raíz (`<base href="/">`).
- **El botón "Registrar" no hace nada:** todavía no tiene acción implementada; usa las tarjetas de cada paso para navegar.
- **Se perdió el progreso del registro:** es el comportamiento esperado; el estado vive en memoria y se reinicia al recargar.
- **La pantalla de fotografía no permite subir archivos:** la carga de imágenes aún no está implementada.
- **Puerto ocupado:** usa otro puerto, por ejemplo `pnpm start -- --port 4300`, o para SSR `PORT=4300 pnpm serve:ssr:primeraAplicacion`.

---

## Recursos adicionales

- [Angular CLI](https://angular.dev/tools/cli)
- [Angular SSR](https://angular.dev/guide/ssr)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Vitest](https://vitest.dev/)
