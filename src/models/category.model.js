import { ObjectId } from 'mongodb';
import  databaseInstance  from '../config/database.js';

export class CategoryModel {
    static getCollection() {
        const db = getDb();
        return db.collection('categories');
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

    static async create(categoryData) {
        const result = await this.getCollection().insertOne({
            ...categoryData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return result;
    }

    static async update(id, categoryData) {
        if (!ObjectId.isValid(id)) return null;
        const result = await this.getCollection().findOneAndUpdate(
            { _id: new ObjectId(id) },
            { 
                $set: { 
                    ...categoryData, 
                    updatedAt: new Date() 
                } 
            },
            { returnDocument: 'after' }
        );
        return result;
    }

    static async delete(id) {
        if (!ObjectId.isValid(id)) return null;
        const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) });
        return result;
    }
}