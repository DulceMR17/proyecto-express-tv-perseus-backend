import { ObjectId } from 'mongodb';
import database from '../config/database.js';

export class ChapterModel {
  static getCollection() {
    return database.getDb().collection('chapters');
  }

  static async getAll() {
    return await this.getCollection().find().toArray();
  }

  static async getById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async create(chapterData) {
    return await this.getCollection().insertOne({
      ...chapterData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  static async update(id, chapterData) {
    if (!ObjectId.isValid(id)) return null;
    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...chapterData, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result.value || result;
  }

  static async delete(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.getCollection().deleteOne({ _id: new ObjectId(id) });
  }
}

export default ChapterModel;
