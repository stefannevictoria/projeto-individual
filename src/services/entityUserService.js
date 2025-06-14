const entityUserRepository = require("../repositories/entityUserRepository");

class EntityUserService {
  async findAll() {
    try {
      return await entityUserRepository.findAll();
    } catch (error) {
      throw new Error("Erro ao buscar relações entidade-usuário");
    }
  }

  async findById(id) {
    try {
      const entityUser = await entityUserRepository.findById(id);
      if (!entityUser)
        throw new Error("Relação entidade-usuário não encontrada");
      return entityUser;
    } catch (error) {
      throw new Error("Erro ao buscar relação entidade-usuário por ID");
    }
  }

  async create(entityUserData) {
    try {
      return await entityUserRepository.create(entityUserData);
    } catch (error) {
      throw new Error("Erro ao criar relação entidade-usuário");
    }
  }

  async update(id, entityUserData) {
    try {
      const updatedEntityUser = await entityUserRepository.update(
        id,
        entityUserData
      );
      if (!updatedEntityUser)
        throw new Error(
          "Relação entidade-usuário não encontrada para atualização"
        );
      return updatedEntityUser;
    } catch (error) {
      throw new Error("Erro ao atualizar relação entidade-usuário");
    }
  }

  async deleteEntityUser(usuario_id, entidade_id) {
    return await entityUserRepository.delete(usuario_id, entidade_id);
  }

  async findByUserId(usuario_id) {
    try {
      return await entityUserRepository.findByUserId(usuario_id);
    } catch (error) {
      throw new Error("Erro ao buscar entidades vinculadas ao usuário");
    }
  }

}

module.exports = new EntityUserService();
