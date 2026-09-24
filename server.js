import app from './app.js';
import database from './src/config/database.js';
import UserModel from './src/models/user.model.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Conexión a MongoDB
    await database.connect();

    // 2. Seeder para el Administrador
    await UserModel.createAdminIfNotExists('admin@tvmanager.com', 'admin123456');

    // 3. Iniciar Servidor
    app.listen(PORT, () => {
      console.log(`[Server] Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`[API SemVer] Rutas v1 en http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('[Server Error] Fallo al iniciar el servidor:', error);
  }
}

startServer();