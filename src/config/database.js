import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    if (!Database.instance) {
      this.client = new MongoClient(process.env.MONGO_URI);
      this.db = null;
      Database.instance = this;
    }
    return Database.instance;
  }

  getCollectionSchemas() {
    return {
      users: {
        bsonType: 'object',
        required: ['email', 'password', 'role', 'createdAt'],
        additionalProperties: true,
        properties: {
          _id: { bsonType: 'objectId' },
          email: { bsonType: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
          password: { bsonType: 'string', minLength: 6 },
          role: { bsonType: 'string', enum: ['admin', 'user'] },
          createdAt: { bsonType: 'date' }
        }
      },
      categories: {
        bsonType: 'object',
        required: ['name', 'createdAt', 'updatedAt'],
        additionalProperties: true,
        properties: {
          _id: { bsonType: 'objectId' },
          name: { bsonType: 'string', minLength: 2, maxLength: 120 },
          description: { bsonType: ['string', 'null'] },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      },
      programs: {
        bsonType: 'object',
        required: ['title', 'categoryId', 'synopsis', 'createdAt', 'updatedAt'],
        additionalProperties: true,
        properties: {
          _id: { bsonType: 'objectId' },
          title: { bsonType: 'string', minLength: 2, maxLength: 200 },
          categoryId: { bsonType: 'objectId' },
          producer: { bsonType: ['string', 'null'] },
          poster: { bsonType: ['string', 'null'] },
          trailer: { bsonType: ['string', 'null'] },
          synopsis: { bsonType: 'string', minLength: 10 },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      },
      actors: {
        bsonType: 'object',
        required: ['name', 'biography', 'createdAt', 'updatedAt'],
        additionalProperties: true,
        properties: {
          _id: { bsonType: 'objectId' },
          name: { bsonType: 'string', minLength: 2, maxLength: 200 },
          photo: { bsonType: ['string', 'null'] },
          biography: { bsonType: 'string', minLength: 10 },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      },
      producers: {
        bsonType: 'object',
        required: ['name', 'createdAt', 'updatedAt'],
        additionalProperties: true,
        properties: {
          _id: { bsonType: 'objectId' },
          name: { bsonType: 'string', minLength: 2, maxLength: 200 },
          logo: { bsonType: ['string', 'null'] },
          description: { bsonType: ['string', 'null'] },
          country: { bsonType: ['string', 'null'] },
          foundationYear: { bsonType: ['int', 'long', 'double', 'decimal', 'null'] },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      },
      chapters: {
        bsonType: 'object',
        required: ['programId', 'number', 'title', 'synopsis', 'createdAt', 'updatedAt'],
        additionalProperties: true,
        properties: {
          _id: { bsonType: 'objectId' },
          programId: { bsonType: 'objectId' },
          number: { bsonType: ['int', 'long', 'double'] },
          title: { bsonType: 'string', minLength: 2, maxLength: 200 },
          season: { bsonType: ['int', 'long', 'double', 'null'] },
          duration: { bsonType: ['string', 'null'] },
          synopsis: { bsonType: 'string', minLength: 10 },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      },
      characters: {
        bsonType: 'object',
        required: ['programId', 'actorId', 'name', 'role', 'description', 'createdAt', 'updatedAt'],
        additionalProperties: true,
        properties: {
          _id: { bsonType: 'objectId' },
          programId: { bsonType: 'objectId' },
          actorId: { bsonType: 'objectId' },
          name: { bsonType: 'string', minLength: 2, maxLength: 200 },
          role: { bsonType: 'string', enum: ['principal', 'secundario'] },
          description: { bsonType: 'string', minLength: 10 },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      }
    };
  }

  async applyMongoValidators() {
    const db = this.db;
    const schemas = this.getCollectionSchemas();

    for (const [collectionName, schema] of Object.entries(schemas)) {
      try {
        const existing = await db.listCollections({ name: collectionName }).next();
        const validatorOptions = {
          validator: { $jsonSchema: schema },
          validationLevel: 'moderate',
          validationAction: 'error'
        };

        if (existing) {
          await db.command({ collMod: collectionName, ...validatorOptions });
        } else {
          await db.createCollection(collectionName, validatorOptions);
        }
      } catch (error) {
        console.warn(`[Database] No se pudo aplicar el esquema a ${collectionName}:`, error.message || error);
      }
    }
  }

  async connect() {
    try {
      if (!this.db) {
        await this.client.connect();
        this.db = this.client.db(process.env.DB_NAME);
        await this.applyMongoValidators();
        console.log(`[Database] Conectado exitosamente a MongoDB: ${process.env.DB_NAME}`);
      }
      return this.db;
    } catch (error) {
      console.error('[Database Error] Error al conectar a MongoDB:', error);
      process.exit(1);
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('La base de datos no ha sido inicializada. Llama a connect() primero.');
    }
    return this.db;
  }

  getClient() {
    return this.client;
  }

  async close() {
    await this.client.close();
    console.log('[Database] Conexión cerrada.');
  }
}

const databaseInstance = new Database();
export const getDb = () => databaseInstance.getDb();
export default databaseInstance;