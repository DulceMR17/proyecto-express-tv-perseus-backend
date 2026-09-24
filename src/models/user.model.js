import database from '../config/database.js';
import bcrypt from 'bcrypt';

class UserModel {
  static getCollection() {
    return database.getDb().collection('users');
  }

  static async findByEmail(email) {
    const normalizedEmail = String(email).trim().toLowerCase();
    return await this.getCollection().findOne({ email: normalizedEmail });
  }

  static async createAdminIfNotExists(email, password) {
    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await this.findByEmail(normalizedEmail);
    if (!existing) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await this.getCollection().insertOne({
        email: normalizedEmail,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      });
      console.log(`[Database Seeder] Usuario Administrador creado: ${normalizedEmail}`);
    }
  }

  static async verifyPassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default UserModel;