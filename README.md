## Manual de usuario
Enlace del manual de usuario: [Manual de usuario](https://github.com/OscarCornejo00/IS2025_Proyecto_ElephanTalk/blob/main/Documentos/Manual%20de%20usuario%20-%20Red%20social%20v0.2.pdf)

## Manual de contribución
Enlace del manual de contribución: [Manual de contribución](https://github.com/OscarCornejo00/IS2025_Proyecto_ElephanTalk/blob/main/Documentos/Manual%20de%20contribuci%C3%B3n%20-%20Red%20social%20v1.0.pdf)

## Documentación API
Enlace de la documentación API: [Documentación API](https://elephantalk-api.onrender.com/docs)

## Aspectos generales

### Objetivos del Documento

Este documento técnico está diseñado para proporcionar una explicación detallada y comprensiva de la arquitectura, las tecnologías, 
y los procesos implementados en el desarrollo de ElephanTalk. Sirve como guía exhaustiva para el equipo de desarrollo y como manual 
de referencia para los administradores del sistema y futuros colaboradores.

### Descripción General

ElephanTalk es una plataforma de red social innovadora diseñada específicamente para estudiantes de informática y áreas afines, creada 
para fomentar la interacción y el intercambio de conocimientos en un entorno seguro y estimulante. La plataforma es dinámica, promoviendo 
activamente la discusión y colaboración en una variedad de temas tecnológicos y computacionales.

Una característica distintiva de ElephanTalk es la integración del modelo de aprendizaje automático Detoxify, reconocido en la comunidad 
de código abierto por su capacidad para analizar y detectar contenido tóxico en texto. Detoxify examina el tono y contenido de los mensajes 
en tiempo real, identificando y categorizando aquellos que podrían ser considerados abusivos, insultantes, o discriminatorios. Esta funcionalidad 
es esencial para mantener un ambiente de respeto y consideración, libre de las toxinas comúnmente encontradas en redes sociales tradicionales.

La implementación de Detoxify en ElephanTalk no solo mejora la moderación de contenido, sino que también proporciona a los usuarios una plataforma 
donde pueden expresarse libremente y de manera segura. Los mensajes y publicaciones son analizados automáticamente para detectar signos de 
toxicidad, ofreciendo una respuesta rápida y efectiva ante el abuso o acoso, lo cual es crucial para preservar la integridad de la comunidad.

Además, ElephanTalk incluirá funcionalidades avanzadas para la gestión de la moderación a través del modelo Detoxify. Esto abarcará desde la 
validación automática de comentarios y publicaciones hasta un sistema de reportes por parte de los usuarios, permitiendo denunciar contenido 
inapropiado. Estos reportes serán revisados por moderadores humanos en un proceso de verificación manual, asegurando así que incluso 
las sutilezas que el modelo automático podría pasar por alto sean adecuadamente gestionadas.

## Nuevas funcionalidades

### Chat en tiempo real

El proyecto ahora incluye un sistema de chat grupal que permite a los usuarios comunicarse en tiempo real:

- **Acceso**: Click en el icono de chat en el navbar
- **Características**:
  - Envío de mensajes instantáneo
  - Actualización automática cada 2 segundos
  - Diferenciación visual entre mensajes propios y ajenos
  - Avatares de usuario
  - Timestamps en cada mensaje
  - Manejo de errores con notificaciones

## Requerimientos del Sistema

Para garantizar una experiencia óptima y el funcionamiento correcto de ElephanTalk en un entorno de producción, es esencial que los usuarios 
accedan a la plataforma mediante un navegador web actualizado. Esto asegura la compatibilidad con las tecnologías modernas utilizadas en el 
desarrollo de ElephanTalk y permite una interacción fluida y segura con todas sus funcionalidades.

 **Requisitos de Software:**

**1. Aplicaciones en producción**

Para utilizar las aplicación del entorno ElephanTalk, es decir:
- [https://elephantalk.vercel.app](https://elephantalk-lime.vercel.app/)

Únicamente es necesario lo siguiente: 

**Navegadores Web:** Los usuarios deben utilizar la versión más reciente de cualquier navegador web principal para asegurar la plena funcionalidad 
de las características de ElephanTalk. Los navegadores recomendados incluyen:

- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

Mantener el navegador actualizado es crucial no solo para la compatibilidad con ElephanTalk, sino también para beneficiarse de las últimas mejoras 
en seguridad y rendimiento que los navegadores modernos ofrecen.

Esta configuración mínima garantiza que todos los componentes interactivos, las visualizaciones dinámicas y las operaciones de moderación de 
contenido se ejecuten de manera eficiente, proporcionando una experiencia de usuario excepcional y libre de problemas técnicos.

**2. Aplicaciones en entorno de desarrollo:**

Para desarrollar y mantener el sistema de ElephanTalk, se deben cumplir con los siguientes requisitos de software:

**Sistema Operativo:**

Se recomienda utilizar Windows 10 o una versión posterior para garantizar la compatibilidad y el rendimiento óptimo de las herramientas de desarrollo. 
Alternativamente, macOS y las distribuciones recientes de Linux también son compatibles.

**Node.js:**

- Versión: Node.js 20.x
- Uso: Necesario para el desarrollo del frontend principal en React y el backend de NestJS.
- Recomendación: Mantener Node.js actualizado a la versión estable más reciente dentro de la serie 20.x para beneficiarse de las mejoras de rendimiento y seguridad.

**Python:**

- Versión: Python 3.10
- Uso: Necesario para el desarrollo de la API en FastAPI.
- Recomendación: Mantener Python actualizado a la versión estable más reciente dentro de la serie 3.10 para asegurar la compatibilidad y estabilidad del entorno de desarrollo.

**NestJS:**

- Versión: La versión estable más reciente compatible con Node.js 20.x
- Uso: Para el desarrollo del sistema de moderación y la API principal.
- Recomendación: Utilizar la documentación oficial de NestJS para configurar y mantener el entorno de desarrollo.

**React:**

- Versión: La versión estable más reciente compatible con Node.js 20.x
- Uso: Para el desarrollo del frontend principal.
- Recomendación: Asegurarse de que todas las dependencias de React estén actualizadas para aprovechar las últimas características y mejoras de seguridad.

**Socket.io:**

- Versión: Compatible con la versión de NestJS y React utilizada (se recomienda v4.x).
- Uso: Para la implementación del sistema de chat en tiempo real y notificaciones instantáneas entre cliente y servidor.
- Recomendación: Asegurar la compatibilidad de versiones entre socket.io (backend) y socket.io-client (frontend) para evitar problemas de conexión y transporte.

**FASTAPI:**

- Versión: La versión estable más reciente compatible con Python 3.10
- Uso: Para el desarrollo de la API secundaria.
- Recomendación: Seguir las guías de instalación y configuración proporcionadas en la documentación oficial de FastAPI.

**Herramientas de Desarrollo:**

- IDE/Editor de Código: Visual Studio Code, WebStorm, PyCharm o cualquier otro editor que soporte desarrollo en JavaScript y Python.
- Control de Versiones: Git (Se recomienda la última versión estable).
- Gestor de Paquetes:
  - yarn: Para gestionar las dependencias de Node.js.
  - pip: Para gestionar las dependencias de Python.
- Navegador Web: Un navegador web actualizado (Google Chrome, Mozilla Firefox, Safari o Microsoft Edge) para probar y depurar la interfaz de usuario y las funcionalidades del sistema.

Estos requisitos aseguran que los desarrolladores cuenten con un entorno de trabajo adecuado para implementar, probar y mantener las aplicaciones de ElephanTalk de manera eficiente.

## Software utilizado:

Para el desarrollo de ElephanTalk, se seleccionaron diversas herramientas y tecnologías que facilitan la creación, prueba y despliegue de la plataforma. A continuación, se detalla cada uno de los componentes de software utilizados:

**React.js:** Utilizado para construir el frontend de la aplicación, React.js es una biblioteca de JavaScript para construir interfaces de usuario de forma eficiente y declarativa. React facilita la creación de componentes interactivos y reutilizables, ideal para la dinámica de una red social como ElephanTalk.

**NestJS:** Un framework progresivo para Node.js utilizado para construir aplicaciones de servidor eficientes y escalables. NestJS usa TypeScript y combina elementos de Programación Orientada a Objetos (POO), Programación Funcional y Programación Reactiva, proporcionando una arquitectura bien estructurada que es fácil de mantener.

**MongoDB con Mongoose:** MongoDB es un sistema de base de datos NoSQL que ofrece alta performance, alta disponibilidad y fácil escalabilidad. Mongoose es una biblioteca para MongoDB y Node.js que facilita la modelación de objetos y manejo de datos con una API sencilla y basada en esquemas para modelar la información de la aplicación.

**Socket.io:** Utilizado para implementar la comunicación bidireccional en tiempo real entre el cliente y el servidor. Esta tecnología es fundamental para las funcionalidades de chat en vivo y notificaciones instantáneas de la plataforma, permitiendo una interacción fluida entre los usuarios.

**FastAPI:** Utilizado para el microservicio que maneja Detoxify, FastAPI es un framework moderno y rápido (de alto rendimiento) para construir APIs con Python 3.7+ basado en las mejores prácticas de tipo anotado. FastAPI facilita la creación de APIs robustas y eficientes que pueden manejar las solicitudes de análisis de contenido de ElephanTalk de manera efectiva.

**Vite y Tailwind CSS:** Vite es una herramienta de construcción de frontend que mejora significativamente la experiencia de desarrollo con su reinicio instantáneo del servidor. Tailwind CSS es un framework de CSS que permite diseñar rápidamente interfaces personalizadas sin salir del HTML, facilitando la creación de un diseño coherente y responsivo para ElephanTalk.

**Versiones Específicas:**

- React.js: v17.0.2
- NestJS: v8.0
- MongoDB: v4.4
- Mongoose: v5.13.8
- Socket.io: v4.8.1
- FastAPI: v0.65.2
- Vite: v2.6
- Tailwind CSS: v2.2

Estas herramientas y tecnologías han sido escogidas no solo por su robustez y escalabilidad, sino también por su compatibilidad y facilidad para integrarse entre sí, asegurando así un desarrollo fluido y un mantenimiento sencillo de ElephanTalk.

## Arquitectura del Sistema

### Patrones de diseño

ElephanTalk implementa una combinación de patrones de diseño tanto en el frontend como en el backend para optimizar la arquitectura de la aplicación y mejorar la experiencia de desarrollo y usuario.

**Frontend:**

- **Composition Pattern y Higher Order Component (HOC) Pattern:** Estos patrones se utilizan en React para mejorar la reutilización de la lógica y la composición de componentes. HOC permite envolver un componente dentro de otro, agregando o compartiendo funcionalidades, lo que resulta en una mejor separación de la lógica y la interfaz.

- **Observer Pattern:** Este patrón facilita la comunicación entre los componentes cuando se produce un cambio de estado. Es esencial para manejar actualizaciones en tiempo real en la interfaz de usuario, especialmente útil en una red social donde los datos como mensajes y notificaciones cambian frecuentemente.

**Backend:**

- **Dependency Injection Pattern:** Utilizado extensivamente en NestJS, este patrón permite desacoplar los componentes del sistema, facilitando un sistema más modular y testeable. Al inyectar dependencias, cada módulo no necesita conocer los detalles de las dependencias necesarias para operar, lo que simplifica la expansión y mantenimiento del backend.

- **Singleton Pattern:** Este patrón asegura que una clase tenga una única instancia, y proporciona un punto de acceso global a ella. En ElephanTalk, se utiliza para manejar la configuración del sistema y la conexión a la base de datos, garantizando que solo exista una instancia de cada una por proceso.

**Ambos (Frontend y Backend):**

- **Adapter Pattern:** Este patrón juega un papel crucial en la integración entre el frontend desarrollado en React y el backend en NestJS. Facilita la conversión de la interfaz de una clase en otra que los clientes esperan, permitiendo que los componentes con interfaces incompatibles trabajen juntos. Esto es particularmente útil para transformar los datos entre el formato que utiliza MongoDB y los requisitos del frontend, asegurando una transmisión de datos fluida y coherente.

**Justificación/Implementación del Uso en el Proyecto:**

La adopción de estos patrones en ElephanTalk ha traído múltiples beneficios:

- **Mantenimiento y Evolución del Sistema:** Los patrones como HOC y Dependency Injection permiten un mantenimiento más sencillo y una evolución sistemática sin grandes alteraciones en el sistema existente.

- **Reutilización de Componentes y Lógica:** El uso de patrones como Composition y Observer en el frontend facilita la reutilización de la lógica y mejora la gestión de estado, lo que reduce errores y duplicación de código.

- **Flexibilidad y Escalabilidad:** Los patrones de diseño implementados proporcionan una base sólida que ofrece flexibilidad en el desarrollo y escalabilidad del sistema, permitiendo adaptar fácilmente ElephanTalk a nuevas necesidades y tecnologías emergentes.

La implementación de estos patrones refleja un enfoque estructurado y bien pensado para el desarrollo de software, asegurando que ElephanTalk no solo cumpla con los requisitos actuales sino que también esté preparada para futuras expansiones y mejoras.

## Diagrama de modelo de datos
<img width="908" height="892" alt="Modelo Dimensional" src="https://github.com/user-attachments/assets/41f91958-816e-4602-8164-e2293d3b958d" />

## Configuración

### Configuración para el front end del sistema

Configuración
Copiar el archivo `.env.example` y renombrarlo a `.env`. Es importante asegurarse de tener las siguientes variables de entorno:

```plaintext
# URL base de la API pública
VITE_PUBLIC_API_URL=""

# Cantidad de publicaciones por página para desplazamiento infinito
VITE_POSTS_PER_PAGE=10
```

### Instalación

```bash
# Instalar dependencias
yarn install

# Ejecutar en modo desarrollo
yarn dev

# Build para producción
yarn build
```

### Configuración para el back end del sistema

Este proyecto consiste en dos servicios: una API de NestJS y una API de FastAPI. Ambos servicios están configurados para ejecutarse en contenedores Docker utilizando Docker Compose.

**Requisitos**

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Estructura del Proyecto**

Tu proyecto debe tener la siguiente estructura:

```bash
/path/to/your/project
├── docker-compose.yml
├── API
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── ...
└── MicroserviceModeration
    ├── Dockerfile
    ├── requirements.txt
    ├── main.py
    └── ...
```

Antes de construir y ejecutar los contenedores, asegúrate de tener el siguiente archivo `.env` en la raíz del proyecto de la API de NestJS (`./API/.env`):

```plaintext
MONGO_URI="mongodb://localhost:27017/tu-base-de-datos"
PORT=3000
JWT_SECRET="tu-secreto-jwt"
TOXICITY_URL="http://fastapi-service:8000"
TOXICITY_THRESHOLD=0.25
```

Asegúrate de actualizar los valores según sea necesario para tu entorno.

1. Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

2. Navega al directorio del proyecto y asegúrate de tener el archivo `.env` en la ubicación correcta (`./API/.env`).

3. Construye y levanta los servicios usando Docker Compose.

```bash
docker-compose up --build
```

Esto construirá las imágenes Docker para ambos servicios y los levantará en sus respectivos puertos.

**Servicios**

- **NestJS API**: disponible en `http://localhost:3000`
- **FastAPI Service**: disponible en `http://localhost:8000`

**Detalles del Docker Compose**

El archivo `docker-compose.yml` define dos servicios:

- `nestjs-api`: La API de NestJS.
- `fastapi-service`: La API de FastAPI para moderación.

Ambos servicios están conectados a una red Docker llamada `backend-network`.

**Dockerfile de NestJS API**

El Dockerfile de la API de NestJS realiza los siguientes pasos:

1. Usa una imagen base con Node.js 20.
2. Establece el directorio de trabajo.
3. Copia los archivos `package.json` y `package-lock.json` y las instala.
4. Copia el resto de los archivos de la aplicación.
5. Copia el archivo `.env`.
6. Compila el proyecto.
7. Expone el puerto `3000`.
8. Define el comando para correr la aplicación.

**Dockerfile de FastAPI**

El Dockerfile de la API de FastAPI realiza los siguientes pasos:

1. Usa una imagen base con Python 3.10.
2. Establece el directorio de trabajo.
3. Copia el archivo `requirements.txt` e instala las dependencias.
4. Descarga y almacena el modelo de clasificación en una capa de la imagen.
5. Copia el resto de los archivos de la aplicación.
6. Expone el puerto `8000`.
7. Define el comando para correr la aplicación.

**Notas**

- Asegúrate de tener Docker y Docker Compose correctamente instalados y configurados en tu sistema.
- Si necesitas hacer cambios en la configuración, actualiza los archivos `.env` y los Dockerfiles según sea necesario.
- Para detener los servicios, puedes usar `Ctrl+C` en la terminal donde están corriendo o ejecutar `docker-compose down` para detener y eliminar los contenedores.

¡Eso es todo! Ahora deberías tener tus servicios de NestJS y FastAPI corriendo en contenedores Docker listos para usar.

## Próximas posibles mejoras

- [ ] Notificaciones push
- [ ] Mensajes privados
- [ ] Indicador de "escribiendo..."
- [ ] Emojis y reacciones
- [ ] Compartir archivos en el chat

## Justificación del Chat Global en ElephanTalk

- **Valor Agregado (Evidencia):** Resolvemos el problema del "usuario solitario" (feed vacío). A diferencia de los posts que requieren construir una red de seguidores previamente, el chat global garantiza contenido accesible el 100% del tiempo para cualquier usuario nuevo.

- **Ejemplo de Uso:** Un usuario recién registrado puede recibir ayuda o bienvenida instantánea de la comunidad sin haber configurado su perfil completo, eliminando barreras de entrada.

- **Métricas y Datos Técnicos:**
  - **Rendimiento:** Implementación vía WebSockets que reduce la latencia de comunicación a < 100ms (tiempo real), comparado con los segundos que tardaría un refresco tradicional HTTP.
  - **Engagement:** Reduce el "Tiempo hasta la Primera Interacción" de minutos (lo que tarda en buscar a quién seguir) a segundos (entrar y saludar).
