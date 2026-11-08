# Derivatto

**Derivatto** es una aplicación educativa móvil para aprender matemáticas mediante ejercicios y experiencias interactivas. Está orientada a facilitar el estudio paso a paso de contenidos matemáticos, con una interfaz adaptada a dispositivos móviles.

## Características

- Experiencias de aprendizaje y ejercicios interactivos.
- Contenido matemático presentado mediante expresiones y notación matemática.
- Navegación móvil con Expo Router.
- Integración con Supabase.
- Autenticación con Google (según la configuración de la aplicación).
- Recursos visuales, notificaciones y retroalimentación háptica.

## Tecnologías

- React Native
- Expo SDK 52
- Expo Router
- TypeScript
- Supabase
- React Navigation
- KaTeX y componentes de renderizado matemático
- EAS Build

## Requisitos

- Node.js y npm.
- Expo CLI (se puede utilizar mediante `npx`).
- Android Studio para emulador Android, Xcode para iOS en macOS o un dispositivo físico.
- Proyecto de Supabase y credenciales de los servicios integrados.

## Instalación

```bash
git clone https://github.com/RonnyToledo/Derivatto.git
cd Derivatto
npm install
```

Crea un archivo `.env` en la raíz con las variables públicas que consume la aplicación:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_KEY=
```

Utiliza los valores de tu propio proyecto Supabase. No incluyas claves privadas o `service_role` en variables `EXPO_PUBLIC_*`, ya que estas se incorporan al bundle de la aplicación.

## Ejecutar

```bash
npx expo start
```

También puedes iniciar directamente una plataforma:

```bash
npm run android
npm run ios
npm run web
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia Expo |
| `npm run android` | Inicia para Android |
| `npm run ios` | Inicia para iOS |
| `npm run web` | Inicia la versión web |
| `npm test` | Ejecuta Jest en modo observación |
| `npm run lint` | Ejecuta Expo Lint |
| `npm run deploy:android` | Ejecuta el perfil de build Android configurado |
| `npm run deploy:web` | Exporta la versión web y ejecuta los pasos de publicación configurados |

## Estructura

- `app/`: rutas y pantallas de Expo Router.
- `components/`: componentes reutilizables.
- `assets/`: iconos, imágenes y recursos gráficos.
- `scripts/`: utilidades de desarrollo.

## Seguridad

No subas archivos `.env` al repositorio. Usa variables de entorno del entorno de desarrollo o del servicio de build y aplica políticas RLS en Supabase.

## Autor

Desarrollado por **Ronny Toledo Ramos** · [GitHub](https://github.com/RonnyToledo).
