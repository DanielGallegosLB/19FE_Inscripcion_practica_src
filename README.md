<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Plataforma de Inscripción de Prácticas Profesionales</h3>

  <p align="center">
    Una solución automatizada para gestionar prácticas profesionales en la Facultad de Ingeniería.
    <br />
    <a href="https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src"><strong>Explorar la documentación »</strong></a>
    <br />
    <br />
    <a href="https://19-frontend.vercel.app/landingPage">Ver Demo</a>
    ·
    <a href="https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/issues/new?labels=bug&template=bug-report---.md">Reportar un error</a>
    ·
    <a href="https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/issues/new?labels=enhancement&template=feature-request---.md">Solicitar una función</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenidos</summary>
  <ol>
    <li>
      <a href="#about-the-project">Acerca del Proyecto</a>
      <ul>
        <li><a href="#built-with">Tecnologías Utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Comenzando</a>
      <ul>
        <li><a href="#prerequisites">Pre-requisitos</a></li>
        <li><a href="#installation">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">Uso</a></li>
    <li><a href="#roadmap">Hoja de Ruta</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#contributing">Contribuciones</a></li>
    <li><a href="#license">Licencia</a></li>
    <li><a href="#contact">Contacto</a></li>
    <li><a href="#acknowledgments">Agradecimientos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Acerca del Proyecto

[![Product Name Screen Shot][product-screenshot]](https://19-frontend.vercel.app/landingPage)

Este proyecto tiene como objetivo facilitar la inscripción y gestión de prácticas profesionales para estudiantes, docentes y supervisores. Automatiza procesos clave, reduce tiempos administrativos y mejora la experiencia del usuario.

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

### Tecnologías Utilizadas

* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Postman][Postman]][Postman-url]
* [![Git][Git]][Git-url]

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- GETTING STARTED -->
## Comenzando

Siga los pasos a continuación para configurar el proyecto en su entorno local.

### Pre-requisitos

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalación

1. Clone el repositorio
   ```sh
   git clone https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src.git
   ```
2. Instale las dependencias de NPM
   ```sh
   npm install
   ```
3. Configure las variables de entorno según el archivo `.env.example`

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- USAGE EXAMPLES -->
## Uso

El sistema permite gestionar usuarios (estudiantes, profesores, administradores) y prácticas profesionales. Ofrece vistas responsivas y funcionalidades específicas para cada tipo de usuario.

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- ROADMAP -->
## Hoja de Ruta

- [x] Gestión de usuarios
- [x] Registro de prácticas profesionales
- [ ] Integración con servicios externos
- [ ] Reportes y estadísticas

Consulte la lista de [issues abiertas](https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/issues) para más detalles.

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- SCRIPTS -->
## Scripts

A continuación, se detallan los scripts configurados en el proyecto:

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "start": "concurrently \"npm run backend\" \"npm run frontend\"",
    "backend": "cd ../19-backend && nodemon server.js",
    "backendnode": "cd backend && node server.js",
    "frontend": "npm run dev",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
}
```

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- CONTRIBUTING -->
## Contribuciones

¡Las contribuciones son lo que hacen que la comunidad de código abierto sea un lugar increíble para aprender, inspirarse y crear! Toda contribución es **muy apreciada**.

1. Realice un fork del proyecto
2. Cree su rama para la función (`git checkout -b feature/NuevaFuncion`)
3. Confirme sus cambios (`git commit -m 'Agrega NuevaFuncion'`)
4. Suba la rama (`git push origin feature/NuevaFuncion`)
5. Abra un Pull Request

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

### Contribuyentes Principales

<a href="https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DanielGallegosLB/19FE_Inscripcion_practica_src" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->
## Licencia

Distribuido bajo la Licencia MIT. Consulte `LICENSE.txt` para más información.

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- CONTACT -->
## Contacto

Daniel Peñaloza Gallegos - [@LinkedIn](https://www.linkedin.com/in/danielpgallegos) - daniel.gallegoslb@gmail.com

Enlace al proyecto: [https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src](https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src)

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Agradecimientos

* A mi equipo de trabajo por su colaboración.
* A la Facultad de Ingeniería por la oportunidad.
* A los usuarios que han proporcionado retroalimentación.

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/DanielGallegosLB/19FE_Inscripcion_practica_src.svg?style=for-the-badge
[contributors-url]: https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DanielGallegosLB/19FE_Inscripcion_practica_src.svg?style=for-the-badge
[forks-url]: https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/network/members
[stars-shield]: https://img.shields.io/github/stars/DanielGallegosLB/19FE_Inscripcion_practica_src.svg?style=for-the-badge
[stars-url]: https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/stargazers
[issues-shield]: https://img.shields.io/github/issues/DanielGallegosLB/19FE_Inscripcion_practica_src.svg?style=for-the-badge
[issues-url]: https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/issues
[license-shield]: https://img.shields.io/github/license/DanielGallegosLB/19FE_Inscripcion_practica_src.svg?style=for-the-badge
[license-url]: https://github.com/DanielGallegosLB/19FE_Inscripcion_practica_src/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/danielpgallegos

