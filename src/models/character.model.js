import { ObjectId } from 'mongodb';
import database from '../config/database.js';

export class CharacterModel {
  static getCollection() {
    return database.getDb().collection('characters');
  }

  static async getAll() {
    return await this.getCollection().find().toArray();
  }

  static async getById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async create(characterData) {
    return await this.getCollection().insertOne({
      ...characterData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  static async update(id, characterData) {
    if (!ObjectId.isValid(id)) return null;
    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...characterData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result.value || result;
  }

  static async delete(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().deleteOne({ _id: new ObjectId(id) });
  }
}

export default CharacterModel;
