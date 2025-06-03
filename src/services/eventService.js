const eventRepository = require('../repositories/eventRepository');

class EventService {
  async findAll() {
    try {
      return await eventRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar eventos');
    }
  }

  async findById(id) {
    try {
      const event = await eventRepository.findById(id);
      if (!event) throw new Error('Evento não encontrado');
      return event;
    } catch (error) {
      throw new Error('Erro ao buscar evento por ID');
    }
  }

  async create(eventData) {
    try {
      return await eventRepository.create(eventData);
    } catch (error) {
      throw new Error('Erro ao criar evento');
    }
  }

  async update(id, eventData) {
    try {
      const updatedEvent = await eventRepository.update(id, eventData);
      if (!updatedEvent) throw new Error('Evento não encontrado para atualização');
      return updatedEvent;
    } catch (error) {
      throw new Error('Erro ao atualizar evento');
    }
  }

  async delete(id) {
    try {
      await eventRepository.delete(id);
    } catch (error) {
      throw new Error('Erro ao deletar evento');
    }
  }
}

module.exports = new EventService();