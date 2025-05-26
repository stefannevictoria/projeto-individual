const regristrationRepository = require('../repositories/regristrationRepository');

class RegristrationService {
  async findAll() {
    try {
      return await regristrationRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar inscrições');
    }
  }

  async findById(id) {
    try {
      const regristration = await regristrationRepository.findById(id);
      if (!regristration) throw new Error('Inscrição não encontrada');
      return regristration;
    } catch (error) {
      throw new Error('Erro ao buscar inscrição por ID');
    }
  }

  async create(regristrationData) {
    try {
      return await regristrationRepository.create(regristrationData);
    } catch (error) {
      throw new Error('Erro ao criar inscrição');
    }
  }

  async delete(id) {
    try {
      await regristrationRepository.delete(id);
    } catch (error) {
      throw new Error('Erro ao deletar inscrição');
    }
  }
}

module.exports = new RegristrationService();