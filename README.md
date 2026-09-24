# TV Management Backend

API REST para gestionar programas de televisión, categorías, actores, productores, capítulos y personajes. Incluye autenticación por JWT, cookies, validaciones, rate limiting y documentación Swagger.

## Tecnologías
- Node.js
- Express
- MongoDB
- JWT + cookies
- bcrypt
- express-validator
- express-rate-limit
- swagger-ui-express
- dotenv
- CORS

## Requisitos
- Node.js 18 o superior
- MongoDB en localhost:27017
- Navegador para la interfaz frontend

## Instalación
1. Entra a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Verifica que exista el archivo `.env` con la configuración correcta.
4. Inicia la API:
   ```bash
   npm start
   ```

## Variables de entorno
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/
DB_NAME=tv_management_db
JWT_SECRET=tv_management_jwt
JWT_EXPIRES_IN=1d
COOKIE_SECRET=tv_management_cookies
FRONTEND_URL=http://localhost:5500,http://localhost:8080
NODE_ENV=development
```

## Arranque del proyecto completo
### Backend
```bash
cd backend
npm start
```
La API quedará disponible en:
- http://localhost:3000
- http://localhost:3000/api/v1
- http://localhost:3000/api-docs

### Frontend
Desde la raíz del proyecto:
```bash
cd frontend
python -m http.server 8080
```
La interfaz quedará disponible en:
- http://localhost:8080

## Arquitectura
- `src/config`: configuración de la base de datos
- `src/controllers`: lógica de negocio
- `src/models`: acceso a MongoDB
- `src/routes`: endpoints de la API
- `src/middlewares`: autenticación, validación y rate limit
- `src/dtos`: transformación y validación de datos
- `src/validators`: reglas de express-validator
- `src/utils`: utilidades auxiliares

## Endpoints principales
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/categories`
- `GET /api/v1/programs`
- `GET /api/v1/actors`
- `GET /api/v1/producers`
- `GET /api/v1/chapters`
- `GET /api/v1/characters`

## Versionado
La API usa rutas versionadas con semver:
- `/api/v1/...`

## Usuario administrador
Al iniciar el backend, se crea automáticamente este usuario si no existe:
- Email: `admin@tvmanager.com`
- Contraseña: `admin123456`

## Solución de problemas comunes
### Error 500 al consultar categorías
Este error se produce si el modelo de categorías no tiene bien conectada la instancia de MongoDB. La corrección aplicada usa la conexión principal desde `database.js`.

### Error de CORS
El backend acepta peticiones desde:
- http://localhost:5500
- http://localhost:8080

## Notas
El proyecto está preparado para funcionar con el frontend local servido desde el puerto 8080 y la API desde el puerto 3000.
