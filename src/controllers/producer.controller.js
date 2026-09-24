import { ProducerModel } from '../models/producer.model.js';
import { ProducerDTO } from '../dtos/producer.dto.js';

export class ProducerController {
  static async getAll(req, res) {
    try {
      const producers = await ProducerModel.getAll();
      return res.status(200).json({ status: 'success', data: producers });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al obtener productoras.', error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const producer = await ProducerModel.getById(id);

      if (!producer) {
        return res.status(404).json({ status: 'fail', message: 'Productora no encontrada.' });
      }

      return res.status(200).json({ status: 'success', data: producer });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al consultar productora.', error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const producerDTO = new ProducerDTO(req.body);
      const existingProducer = await ProducerModel.getByName(producerDTO.name);

      if (existingProducer) {
        return res.status(400).json({ status: 'fail', message: 'Ya existe una productora con ese nombre.' });
      }

      const result = await ProducerModel.create(producerDTO);
      return res.status(201).json({
        status: 'success',
        message: 'Productora creada correctamente.',
        data: { id: result.insertedId, ...producerDTO }
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al crear productora.', error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const producerDTO = new ProducerDTO(req.body);
      const updatedProducer = await ProducerModel.update(id, producerDTO);

      if (!updatedProducer) {
        return res.status(404).json({ status: 'fail', message: 'Productora no encontrada.' });
      }

      return res.status(200).json({ status: 'success', message: 'Productora actualizada correctamente.', data: updatedProducer });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al actualizar productora.', error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await ProducerModel.delete(id);

      if (!result || result.deletedCount === 0) {
        return res.status(404).json({ status: 'fail', message: 'Productora no encontrada.' });
      }

      return res.status(200).json({ status: 'success', message: 'Productora eliminada correctamente.' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Error al eliminar productora.', error: error.message });
    }
  }
}

export default ProducerController;
