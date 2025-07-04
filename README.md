# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a> <img src="assets\inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança"> </a>
</p>

# Certifica

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="/assets/certifica.png" alt="Certifica" border="0"></a>
</p>

## :student: Integrantes: 
- <a href="https://www.linkedin.com/in/stefanne-soares-9b31a8256/">Stefanne Victória Andrade Soares</a> 

## :teacher: Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/laizaribeiro/">Laíza Ribeiro Silva</a>
### Instrutores
- <a href="https://www.linkedin.com/in/afonsolelis/">Afonso Cesar Lelis Brandão</a>


## 📝 Descrição

**Certifica** é uma plataforma web voltada para o gerenciamento de eventos acadêmicos, como palestras, workshops, seminários e outras atividades educacionais. O sistema permite que usuários se cadastrem na plataforma, se inscrevam em eventos e, ao confirmarem presença, recebam certificados digitais personalizados diretamente pelo site.

Para garantir a autenticidade e a relevância dos eventos cadastrados, apenas usuários vinculados a uma entidade reconhecida — como faculdades, ligas acadêmicas, empresas ou organizações — podem criar e gerenciar eventos. Essa verificação ajuda a manter a qualidade e credibilidade da plataforma.

Cada evento possui informações detalhadas como nome, descrição, data, local e duração. Os usuários interessados podem se inscrever e realizar check-in durante a atividade para confirmar sua presença. Após a confirmação, o sistema gera automaticamente um certificado digital em PDF, que fica disponível para download no perfil do participante.

Certifica visa facilitar o processo de gestão de eventos e emissão de certificados, promovendo a valorização da participação acadêmica de forma simples, segura e acessível.

## 📝 Link de demonstração

_Coloque aqui o link para seu projeto publicado e link para vídeo de demonstração_

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- `assets/`: aqui estão os arquivos relacionados a elementos não-estruturados deste repositório, como imagens.

- `config/`: Arquivos relacionados à configuração do projeto.

- `controllers/`: Lógica de controle das requisições da aplicação.

- `documentos/`: Documentos do projeto, como o Web Application  Document (WAD).

- `models/`: Definições dos modelos de dados utilizados na aplicação.

- `repositories`: Responsável pela comunicação com o banco de dados (queries).

- `routes/`: Definição as rotas da aplicação.

- `scripts/`: Arquivos de JavaScript públicos.

- `services/`: Serviços auxiliares da aplicação.

- `tests/`: Arquivos de testes unitários.

- `views/`: Views da aplicação web.

- `.env.example`: Arquivo de exemplo para as variáveis de ambiente.

- `.gitignore`: Arquivo que especifica arquivos e diretórios que o Git deve ignorar.

- `jest.config.js`: Arquivo de configuração para o framework de testes Jest.

- `package.json`: Informações sobre o projeto e suas dependências.

- `README.md`: Arquivo que serve como guia introdutório e explicação geral sobre o projeto e a aplicação (o mesmo arquivo que você está lendo agora).

- `rest.http`: 

- `server.js`: Arquivo principal que inicializa o servidor da aplicação.


## 💻 Como inicializar o projeto

1- _Clone o repositório_:

```bash
git clone https://github.comstefannevictoria/projeto-individual.git
cd PROJETO-INDIVIDUAL
```

2- _Instale as dependências. Confira se o Node.js esta instalado. Após isso, execute:_

```bash
npm install
```

3- _Para garantir o correto funcionamento do projeto, é necessário criar um arquivo .env na raiz, caso ainda não exista. Dentro dele, defina as variáveis de ambiente com as credenciais do seu banco de dados no Supabase, seguindo o modelo abaixo:_

```bash
DB_USER= "seu_usuario"
DB_HOST= "seu_host"
DB_DATABASE= "seu_banco"
DB_PASSWORD= "sua_senha"
DB_PORT= "sua_porta"
DB_SSL= "true"
PORT= 3000
```

4- _Execute o script de inicialização do banco de dados: Certifique-se de que o banco de dados PostgreSQL está configurado e rodando. Após isso, execute o script SQL para criar as tabelas:_

```bash
node scripts/runSQLScript.js
```

5- _Inicie o servidor: Execute o comando abaixo:_

```bash
npm start
```

6- _Acesse a aplicação: Abra o navegador e acesse:_

```bash
http://localhost:3000
```


## 🗃 Histórico de lançamentos

* 0.5.0 - XX/XX/2024
    * 
* 0.4.0 - XX/XX/2024
    * 
* 0.3.0 - XX/XX/2024
    * 
* 0.2.0 - XX/XX/2024
    * 
* 0.1.0 - 09/05/2025
    * Atualização do read.me
    * Introdução (seção 1 do WAD)
    * Diagrama do banco de dados
    * Estruturação do projeto e adição do modelo físico

## 📋 Licença/License
```
Alunos inteli (remover essa observação do readme.md após leitura e execução, junto com o link para o tutorial):

1. Siga o tutorial para criação da licença: https://drive.google.com/file/d/1hXWLHUhjBkPVuGqeE2LZKozFntnJZzlx/view
```

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Intelihub/Template_M2/">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.yggbrasil.com.br/vr">Inteli, Stefanne Victória Andrade Soares</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
