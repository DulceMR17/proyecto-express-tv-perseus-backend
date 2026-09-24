import { ActorModel } from '../models/actor.model.js';
import { ActorDTO } from '../dtos/actor.dto.js';

export class ActorController {
  static async getAll(req, res) {
    try {
      const actors = await ActorModel.getAll();
      return res.status(200).json({ status: 'success', data: actors });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al obtener actores.', error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const actor = await ActorModel.getById(id);

      if (!actor) {
        return res.status(404).json({ status: 'fail', message: 'Actor no encontrado.' });
      }

      return res.status(200).json({ status: 'success', data: actor });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al consultar actor.', error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const actorDTO = new ActorDTO(req.body);
      const existingActor = await ActorModel.getByName(actorDTO.name);

      if (existingActor) {
        return res.status(400).json({ status: 'fail', message: 'Ya existe un actor con ese nombre.' });
      }

      const result = await ActorModel.create(actorDTO);
      return res.status(201).json({ status: 'success', message: 'Actor creado correctamente.', data: { id: result.insertedId, ...actorDTO } });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al crear actor.', error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const actorDTO = new ActorDTO(req.body);
      const updatedActor = await ActorModel.update(id, actorDTO);

      if (!updatedActor) {
        return res.status(404).json({ status: 'fail', message: 'Actor no encontrado.' });
      }

      return res.status(200).json({ status: 'success', message: 'Actor actualizado correctamente.', data: updatedActor });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al actualizar actor.', error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await ActorModel.delete(id);

      if (!result || result.deletedCount === 0) {
        return res.status(404).json({ status: 'fail', message: 'Actor no encontrado.' });
      }

      return res.status(200).json({ status: 'success', message: 'Actor eliminado correctamente.' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al eliminar actor.', error: error.message });
    }
  }
}

export default ActorController;
