-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL
);

-- Tabela de entidades
CREATE TABLE IF NOT EXISTS entidade (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(50) NOT NULL  -- Ex: "faculdade", "liga", "empresa"
);

-- Relação entre usuários e entidades
CREATE TABLE IF NOT EXISTS entidade_usuario (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  entidade_id INT NOT NULL REFERENCES entidade(id) ON DELETE CASCADE,
  papel VARCHAR(50) NOT NULL  -- Ex: "membro", "organizador"
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS evento (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT NOT NULL,
  data DATE NOT NULL,
  local VARCHAR(150) NOT NULL,
  duracao_horas INT NOT NULL,
  entidade_id INT NOT NULL REFERENCES entidade(id) ON DELETE CASCADE
);

-- Tabela de inscrições
CREATE TABLE IF NOT EXISTS inscricao (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  evento_id INT NOT NULL REFERENCES evento(id) ON DELETE CASCADE,
  status_presenca BOOLEAN DEFAULT FALSE,
  codigo_checkin VARCHAR(100)
);

ALTER TABLE inscricao
ADD CONSTRAINT inscricao_unica UNIQUE (usuario_id, evento_id);

-- Tabela de certificados
CREATE TABLE IF NOT EXISTS certificado (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  evento_id INT NOT NULL REFERENCES evento(id) ON DELETE CASCADE,
  link_pdf VARCHAR(255) NOT NULL,
  data_emissao DATE NOT NULL
);