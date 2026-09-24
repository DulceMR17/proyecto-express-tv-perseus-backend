import { ObjectId } from 'mongodb';
import database from '../config/database.js';

export class ProducerModel {
  static getCollection() {
    return database.getDb().collection('producers');
  }

  static async getAll() {
    return await this.getCollection().find().toArray();
  }

  static async getById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async getByName(name) {
    return await this.getCollection().findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  }

  static async create(producerData) {
    return await this.getCollection().insertOne({
      ...producerData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  static async update(id, producerData) {
    if (!ObjectId.isValid(id)) return null;
    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...producerData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result.value || result;
  }

  static async delete(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().deleteOne({ _id: new ObjectId(id) });
  }
}

export default ProducerModel;
