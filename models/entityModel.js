class Entity {
    constructor({ id = null, nome, tipo}) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
    }
  }

  module.exports = Entity;