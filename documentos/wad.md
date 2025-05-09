# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Certifica

#### Stefanne Victória Andrade Soares

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

A seção 1 tem como objetivo contextualizar a solução desenvolvida.

O Certifica é uma plataforma web desenvolvida para facilitar a organização e o gerenciamento de eventos acadêmicos, como palestras, workshops e seminários. O sistema permite que usuários se cadastrem na plataforma, se inscrevam em eventos e, ao confirmarem presença, recebam automaticamente seus certificados digitais.

A criação de eventos está restrita a usuários vinculados a entidades reconhecidas — como faculdades, ligas acadêmicas ou empresas — garantindo que apenas organizações autorizadas possam ofertar atividades na plataforma. Isso assegura a credibilidade dos eventos e a validade dos certificados emitidos.

Uma das principais funcionalidades do sistema é a geração automatizada de certificados em PDF, que ficam disponíveis ao usuário diretamente na plataforma após a confirmação de sua presença em determinado evento. Essa confirmação é realizada por meio de um código de check-in único, fornecido ao participante.

O nome Certifica foi escolhido por refletir diretamente o propósito da aplicação: certificar a participação de indivíduos em atividades acadêmicas relevantes. Além disso, o nome remete à ideia de confiabilidade, oficialidade e facilidade no acesso a certificados digitais.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

Esta subseção (3.1) apresenta a modelagem do banco de dados utilizada na construção do sistema Certifica. São exibidos os diagramas relacionais com as entidades, atributos e relacionamentos que estruturam a base de dados, além do modelo físico representado por meio do schema SQL.

A modelagem de banco de dados é uma etapa fundamental no desenvolvimento de sistemas, pois define a estrutura lógica e física para armazenamento, relacionamento e organização das informações utilizadas pela aplicação.

A modelagem do banco de dados do sistema **Certifica** foi projetada para refletir as principais regras de negócio envolvidas no gerenciamento de eventos acadêmicos e na emissão de certificados. A imagem abaixo apresenta o modelo lógico do banco, incluindo as entidades, atributos e os relacionamentos entre as tabelas.

<div align="center">
  <sub> Figura 1: 5 Forças de Porter do parceiro de projeto </sub>

![Modelo Lógico](https://res.cloudinary.com/dwewomj84/image/upload/v1746822349/modeloLogico_lod8og.png) 
<br>
  <sup> Fonte: Autoral, 2025</sup>
</div> <br>

O banco é composto por sete tabelas principais:

A tabela `usuario` armazena os dados dos usuários cadastrados na plataforma, contendo atributos como `nome`, `email` e `senha_hash` para autenticação segura. Já a tabela `entidade` representa instituições ou organizações que podem cadastrar eventos, como faculdades, ligas ou empresas. Essas entidades se conectam aos usuários por meio da tabela intermediária `entidade_usuario`, que além de vincular um usuário a uma entidade, também define seu papel (por exemplo, "membro" ou "organizador").

Cada entidade pode criar múltiplos eventos, que são registrados na tabela `evento`, contendo informações como nome, descrição, data, local e duração. A associação entre entidades e eventos é de um para muitos (1:N), já que uma entidade pode organizar vários eventos, mas cada evento está vinculado a uma única entidade.

A participação dos usuários nos eventos é registrada na tabela `inscricao`. Essa tabela estabelece uma relação de muitos para muitos entre usuários e eventos (N:N), permitindo que um usuário possa se inscrever em diversos eventos, e cada evento tenha múltiplos participantes. Nela, também são armazenados o status de presença e o código de check-in utilizado para confirmar a presença no evento.

A geração dos certificados é feita com base nas inscrições com presença confirmada. A tabela `certificado` associa cada certificado a um único usuário e a um único evento, formando uma relação de muitos para um (1:N) com ambas as entidades. Cada registro possui o link para o PDF do certificado e a data de emissão.

Essa estrutura garante a integridade referencial do sistema e permite controlar de forma precisa os dados dos participantes, organizadores, eventos e certificados gerados, mantendo a coerência com as regras de negócio da aplicação.

Para a construção do Modelo Físico, o modelo lógico foi traduzido para comandos SQL.

O modelo físico do banco de dados corresponde à implementação concreta da estrutura lógica em um Sistema de Gerenciamento de Banco de Dados (SGBD). Ele especifica, por meio de instruções SQL, a criação das tabelas, os tipos de dados de cada atributo, as chaves primárias e estrangeiras, bem como as restrições de integridade necessárias. Essa etapa é fundamental para garantir que o banco de dados, em ambiente de produção, reflita com precisão as regras de negócio definidas na modelagem lógica.

O arquivo com o Modelo Físico do Banco de Dados pode ser acessado em: <a href="https://github.com/stefannevictoria/projeto-individual/blob/main/scripts/init.sql">Modelo Físico</a>.


### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---
