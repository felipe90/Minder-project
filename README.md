# Minder React - Modern Movie & TV Rating App

Una aplicación moderna construida con React + TypeScript para calificar películas y series de TV.

## ✨ Características

- 🎬 Explorar películas populares
- 📺 Explorar series de TV populares
- ⭐ Calificar películas y series
- 🔍 Filtrar por año, género y orden
- 💾 Guardar calificaciones (localStorage)
- 📱 Diseño responsivo
- ⚡ Rendimiento optimizado con Vite

## 🛠️ Tecnologías

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router v6** - Navigation
- **Zustand** - State Management
- **Axios** - HTTP Client
- **TMDb API** - Movies & TV Data

## 📋 Requisitos

- Node.js 16+
- npm o yarn
- TMDb API Key (Gratis en https://www.themoviedb.org/settings/api)

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd minder-react
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` y agregar tu TMDb API Key:
```
VITE_TMDB_API_KEY=tu_api_key_aqui
```

## 🏃 Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── common/         # Header, Menu, Footer
│   ├── dashboard/      # Componentes del dashboard
│   ├── movie/          # Componentes de películas
│   └── tv/             # Componentes de series
├── pages/              # Page components
├── hooks/              # Custom hooks (futuro)
├── services/           # API calls y configuración
│   ├── tmdbService.ts
│   ├── types.ts
│   └── config.ts
├── store/              # Zustand stores
│   ├── movieStore.ts
│   └── tvStore.ts
├── styles/             # CSS modules
└── App.tsx            # Main component
```

## 🔄 Flujo de Datos

1. **Componentes** solicitan datos a través de Zustand stores
2. **Stores** utilizan `tmdbService` para hacer peticiones API
3. **tmdbService** comunica con The Movie Database API
4. **Respuestas** se almacenan en el estado de Zustand
5. **Componentes** se re-renderizan automáticamente

## 📊 Rutas

- `/dashboard` - Página principal con películas y series populares
- `/rate-movie` - Página para calificar películas
- `/rate-tv` - Página para calificar series

## 💾 Almacenamiento de Calificaciones

Las calificaciones se guardan en localStorage con las siguientes claves:
- `movieRatings` - Calificaciones de películas
- `tvRatings` - Calificaciones de series

## 🔐 Seguridad

⚠️ **IMPORTANTE**: 
- NUNCA comitear el archivo `.env` con tu API Key
- El archivo `.env` está en `.gitignore` por defecto
- Usar `VITE_` como prefijo para variables que se usen en el cliente

## 🎨 Personalización de Temas

Los colores principales se pueden modificar en los archivos CSS:
- Color primario: `#667eea`
- Color secundario: `#764ba2`

## 🚀 Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Netlify

```bash
npm run build
```

Subir la carpeta `dist/` a Netlify.

### Vercel

```bash
npm run build
```

Conectar repositorio a Vercel automáticamente.

## 📝 Próximas Mejoras

- [ ] Temas oscuro/claro
- [ ] Autenticación de usuario
- [ ] Backend para guardar calificaciones
- [ ] Recomendaciones personalizadas
- [ ] Compartir calificaciones
- [ ] Tests unitarios
- [ ] PWA capabilities

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 🙏 Agradecimientos

- The Movie Database (TMDb) por la API
- React y comunidad de desarrolladores
- Vite por el excelente tooling

## 📞 Soporte

Para reportar issues o sugerencias, por favor crear un issue en el repositorio.
