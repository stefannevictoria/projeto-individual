const certificateRepository = require('../repositories/certificateRepository');

class CertificateService {
  async findAll() {
    try {
      return await certificateRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar certificado');
    }
  }

  async findById(id) {
    try {
      const certificate = await certificateRepository.findById(id);
      if (!certificate) throw new Error('Certificado não encontrado');
      return certificate;
    } catch (error) {
      throw new Error('Erro ao buscar certificado por ID');
    }
  }

}

module.exports = new CertificateService();