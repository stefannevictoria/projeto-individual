class Certificate {
    constructor({ id, usuario_id, evento_id, link_pdf, data_emissao}) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.evento_id = evento_id;
        this.link_pdf = link_pdf;
        data_emissao = data_emissao;
    }
  }

  module.exports = Certificate;