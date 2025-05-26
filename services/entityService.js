const entityRepository = require('../repositories/entityRepository');

class EntityService {
  async findAll() {
    try {
      return await entityRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar entidade');
    }
  }

  async findById(id) {
    try {
      const entity = await entityRepository.findById(id);
      if (!entity) throw new Error('Entidade não encontrado');
      return entity;
    } catch (error) {
      throw new Error('Erro ao buscar entidade por ID');
    }
  }

}

module.exports = new EntityService();