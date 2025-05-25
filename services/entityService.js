const EntityRepository = require('../repositories/entityRepository');

class EntityService {
  async findAll() {
    try {
      return await EntityRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar entidade');
    }
  }

  async findById(id) {
    try {
      const entity = await EntityRepository.findById(id);
      if (!entity) throw new Error('Entidade não encontrado');
      return entity;
    } catch (error) {
      throw new Error('Erro ao buscar entidade por ID');
    }
  }

}

module.exports = new EntityService();