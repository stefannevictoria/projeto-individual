const userRepository = require('../repositories/userRepository');

class UserService {
  async findAll() {
    try {
      return await userRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar usuários');
    }
  }

  async findById(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) throw new Error('Usuário não encontrado');
      return user;
    } catch (error) {
      throw new Error('Erro ao buscar usuário por ID');
    }
  }

  async create(userData) {
    try {
      return await userRepository.create(userData);
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  }

  async update(id, userData) {
    try {
      const updatedUser = await userRepository.update(id, userData);
      if (!updatedUser) throw new Error('Usuário não encontrado para atualização');
      return updatedUser;
    } catch (error) {
      console.error("Erro real no userService.update:", error); // 👈 LOGA o erro
      throw error;
    }
  }

  async delete(id) {
    try {
      await userRepository.delete(id);
    } catch (error) {
      throw new Error('Erro ao deletar usuário');
    }
  }

  async findByEmail(email) {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) throw new Error('Usuário não encontrado');
      return user;
    } catch (error) {
      throw new Error('Erro ao buscar usuário por email');
    }
  }

}

module.exports = new UserService();