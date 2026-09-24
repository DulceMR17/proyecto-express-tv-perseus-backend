import { ProgramModel } from '../models/program.model.js';
import { ProgramDTO } from '../dtos/program.dto.js';

export class ProgramController {
  static async getAll(req, res) {
    try {
      const programs = await ProgramModel.getAll();
      return res.status(200).json({
        status: 'success',
        data: programs
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al obtener programas.',
        error: error.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const program = await ProgramModel.getById(id);

      if (!program) {
        return res.status(404).json({
          status: 'fail',
          message: 'Programa no encontrado.'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: program
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al consultar el programa.',
        error: error.message
      });
    }
  }

  static async create(req, res) {
    try {
      const programDTO = new ProgramDTO(req.body);
      const existingProgram = await ProgramModel.getByTitle(programDTO.title);

      if (existingProgram) {
        return res.status(400).json({
          status: 'fail',
          message: 'Ya existe un programa con ese título.'
        });
      }

      const result = await ProgramModel.create(programDTO);
      return res.status(201).json({
        status: 'success',
        message: 'Programa creado correctamente.',
        data: {
          id: result.insertedId,
          ...programDTO
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al crear el programa.',
        error: error.message
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const programDTO = new ProgramDTO(req.body);
      const updatedProgram = await ProgramModel.update(id, programDTO);

      if (!updatedProgram) {
        return res.status(404).json({
          status: 'fail',
          message: 'Programa no encontrado.'
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Programa actualizado correctamente.',
        data: updatedProgram
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al actualizar el programa.',
        error: error.message
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await ProgramModel.delete(id);

      if (!result || result.deletedCount === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'Programa no encontrado.'
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Programa eliminado correctamente.'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al eliminar el programa.',
        error: error.message
      });
    }
  }
}

export default ProgramController;
