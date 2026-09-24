# TV Management Backend

API REST para gestionar programas de televisión con autenticación, roles, validaciones y versionado SemVer.

## Tecnologías
- Node.js
- Express
- MongoDB Driver oficial (`mongodb`)
- JWT + cookies
- bcrypt
- express-validator
- express-rate-limit
- swagger-ui-express
- dotenv

## Requisitos
- Node.js 18+
- MongoDB local o remoto

## Instalación
1. Instala dependencias:
   npm install
2. Crea un archivo `.env` con el contenido de `.env.example`.
3. Inicia el servidor:
   npm run dev

## Variables de entorno
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=tv_management_db
JWT_SECRET=super_secreto_para_firma_de_tokens_jwt
JWT_EXPIRES_IN=1d
COOKIE_SECRET=tv_cookie_secret
FRONTEND_URL=http://localhost:5500
NODE_ENV=development
```

## Arquitectura MVC
- `config`: configuración de MongoDB
- `controllers`: lógica de negocio
- `models`: acceso a MongoDB
- `routes`: endpoints versionados
- `middlewares`: autenticación, validación, rate limit
- `dtos`: limpieza y validación de datos
- `validators`: reglas de express-validator
- `utils`: funciones auxiliares

## Endpoints principales
- `/api/v1/auth/login`
- `/api/v1/auth/logout`
- `/api/v1/auth/me`
- `/api/v1/categories`
- `/api/v1/programs`
- `/api/v1/actors`
- `/api/v1/producers`
- `/api/v1/chapters`
- `/api/v1/characters`
- `/api-docs`

## Versionado
La API usa versionado SemVer en rutas: `/api/v1/...`.

## Usuario administrador
El backend crea este usuario al iniciar:

- Email: `admin@tvmanager.com`
- Contraseña: `admin123456`

## Frontend
Repositorio del frontend: [Agregar aquí el link del repositorio del frontend]
