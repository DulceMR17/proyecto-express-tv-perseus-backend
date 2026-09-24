import { ObjectId } from 'mongodb';
import database from '../config/database.js';

export class ProgramModel {
  static getCollection() {
    return database.getDb().collection('programs');
  }

  static async getAll() {
    return await this.getCollection().find().toArray();
  }

  static async getById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async getByTitle(title) {
    return await this.getCollection().findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') }
    });
  }

  static async create(programData) {
    const normalizedData = { ...programData };

    if (normalizedData.categoryId && ObjectId.isValid(normalizedData.categoryId)) {
      normalizedData.categoryId = new ObjectId(normalizedData.categoryId);
    }

    return await this.getCollection().insertOne({
      ...normalizedData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  static async update(id, programData) {
    if (!ObjectId.isValid(id)) return null;

    const normalizedData = { ...programData };
    if (normalizedData.categoryId && ObjectId.isValid(normalizedData.categoryId)) {
      normalizedData.categoryId = new ObjectId(normalizedData.categoryId);
    }

    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...normalizedData,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    return result.value || result;
  }

  static async delete(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().deleteOne({ _id: new ObjectId(id) });
  }
}

export default ProgramModel;
