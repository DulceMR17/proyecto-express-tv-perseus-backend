import { ChapterModel } from '../models/chapter.model.js';
import { ChapterDTO } from '../dtos/chapter.dto.js';

export class ChapterController {
  static async getAll(req, res) {
    try {
      const chapters = await ChapterModel.getAll();
      return res.status(200).json({ status: 'success', data: chapters });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al obtener capítulos.', error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const chapter = await ChapterModel.getById(id);
      if (!chapter) {
        return res.status(404).json({ status: 'fail', message: 'Capítulo no encontrado.' });
      }
      return res.status(200).json({ status: 'success', data: chapter });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al consultar capítulo.', error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const chapterDTO = new ChapterDTO(req.body);
      const result = await ChapterModel.create(chapterDTO);
      return res.status(201).json({
        status: 'success',
        message: 'Capítulo creado correctamente.',
        data: { id: result.insertedId, ...chapterDTO }
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al crear capítulo.', error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const chapterDTO = new ChapterDTO(req.body);
      const updated = await ChapterModel.update(id, chapterDTO);
      if (!updated) {
        return res.status(404).json({ status: 'fail', message: 'Capítulo no encontrado.' });
      }
      return res.status(200).json({ status: 'success', message: 'Capítulo actualizado correctamente.', data: updated });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al actualizar capítulo.', error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await ChapterModel.delete(id);
      if (!result || result.deletedCount === 0) {
        return res.status(404).json({ status: 'fail', message: 'Capítulo no encontrado.' });
      }
      return res.status(200).json({ status: 'success', message: 'Capítulo eliminado correctamente.' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al eliminar capítulo.', error: error.message });
    }
  }
}

export default ChapterController;
