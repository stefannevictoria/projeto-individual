class Event {
    constructor({ id, nome, descricao, data, local, duracao_horas, entidade_id}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.local = local;
        this.duracao_horas = duracao_horas;
        this.entidade_id = entidade_id;
    }
  }

module.exports = Event;