const registrationRepository = require('../repositories/registrationRepository');

class RegistrationService {
  async findAll() {
    try {
      return await registrationRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar inscrições');
    }
  }

  async findById(id) {
    try {
      const registration = await registrationRepository.findById(id);
      if (!registration) throw new Error('Inscrição não encontrada');
      return registration;
    } catch (error) {
      throw new Error('Erro ao buscar inscrição por ID');
    }
  }

    async create(registrationData) {
      try {
        const existing = await registrationRepository.findByUserAndEvent(
          registrationData.usuario_id,
          registrationData.evento_id
        );

        if (existing) {
          throw new Error('Usuário já está inscrito neste evento');
        }

        return await registrationRepository.create(registrationData);
      } catch (error) {
        throw new Error('Erro ao criar inscrição: ' + error.message);
      }
    }


  async update(id, registrationData) {
    try {
        const updatedRegistration = await registrationRepository.update(id, registrationData);
        if (!updatedRegistration) throw new Error('Inscrição não encontrado para atualização');
        return updatedRegistration;
    } catch (error) {
        throw new Error('Erro ao atualizar inscrição');
    }
   }

  async delete(id) {
    try {
      await registrationRepository.delete(id);
    } catch (error) {
      throw new Error('Erro ao deletar inscrição');
    }
  }
}

module.exports = new RegistrationService();