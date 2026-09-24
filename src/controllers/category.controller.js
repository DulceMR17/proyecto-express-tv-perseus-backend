import { CategoryModel } from '../models/category.model.js';
import { CategoryDTO } from '../dtos/category.dto.js';

export class CategoryController {
    
    // GET /api/v1/categories
    static async getAll(req, res) {
        try {
            const categories = await CategoryModel.getAll();
            return res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
        }
    }

    // GET /api/v1/categories/:id
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.getById(id);

            if (!category) {
                return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
            }

            return res.status(200).json({ success: true, data: category });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
        }
    }

    // POST /api/v1/categories (Solo Administrador)
    static async create(req, res) {
        try {
            const categoryDto = new CategoryDTO(req.body);

            // Verificar si ya existe una categoría con ese nombre
            const existingCategory = await CategoryModel.getByName(categoryDto.name);
            if (existingCategory) {
                return res.status(400).json({ success: false, message: 'La categoría ya existe' });
            }

            const result = await CategoryModel.create(categoryDto);
            return res.status(201).json({
                success: true,
                message: 'Categoría creada con éxito',
                data: { id: result.insertedId, ...categoryDto }
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error al crear categoría', error: error.message });
        }
    }

    // PUT /api/v1/categories/:id (Solo Administrador)
    static async update(req, res) {
        try {
            const { id } = req.params;
            const categoryDto = new CategoryDTO(req.body);

            const updatedCategory = await CategoryModel.update(id, categoryDto);

            if (!updatedCategory) {
                return res.status(404).json({ success: false, message: 'Categoría no encontrada para actualizar' });
            }

            return res.status(200).json({
                success: true,
                message: 'Categoría actualizada con éxito',
                data: updatedCategory
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error al actualizar categoría', error: error.message });
        }
    }

    // DELETE /api/v1/categories/:id (Solo Administrador)
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryModel.delete(id);

            if (!result || result.deletedCount === 0) {
                return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
            }

            return res.status(200).json({ success: true, message: 'Categoría eliminada con éxito' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error al eliminar categoría', error: error.message });
        }
    }
}