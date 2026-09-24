import { CharacterModel } from '../models/character.model.js';
import { CharacterDTO } from '../dtos/character.dto.js';

export class CharacterController {
  static async getAll(req, res) {
    try {
      const characters = await CharacterModel.getAll();
      return res.status(200).json({ status: 'success', data: characters });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al obtener personajes.', error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const character = await CharacterModel.getById(id);
      if (!character) {
        return res.status(404).json({ status: 'fail', message: 'Personaje no encontrado.' });
      }
      return res.status(200).json({ status: 'success', data: character });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al consultar personaje.', error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const characterDTO = new CharacterDTO(req.body);
      const result = await CharacterModel.create(characterDTO);
      return res.status(201).json({
        status: 'success',
        message: 'Personaje creado correctamente.',
        data: { id: result.insertedId, ...characterDTO }
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al crear personaje.', error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const characterDTO = new CharacterDTO(req.body);
      const updated = await CharacterModel.update(id, characterDTO);
      if (!updated) {
        return res.status(404).json({ status: 'fail', message: 'Personaje no encontrado.' });
      }
      return res.status(200).json({ status: 'success', message: 'Personaje actualizado correctamente.', data: updated });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al actualizar personaje.', error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await CharacterModel.delete(id);
      if (!result || result.deletedCount === 0) {
        return res.status(404).json({ status: 'fail', message: 'Personaje no encontrado.' });
      }
      return res.status(200).json({ status: 'success', message: 'Personaje eliminado correctamente.' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al eliminar personaje.', error: error.message });
    }
  }
}

export default CharacterController;
