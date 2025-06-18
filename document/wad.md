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

A seção 3 apresenta a concepção técnica e estrutural do sistema web **Certifica**, destacando os principais componentes envolvidos no seu desenvolvimento. O objetivo é oferecer uma visão ampla e fundamentada da arquitetura da aplicação, incluindo os aspectos de modelagem de dados, organização das pastas e fluxos principais.

### 3.1. Modelagem do banco de dados

Esta subseção (3.1) apresenta a modelagem do banco de dados utilizada na construção do sistema Certifica. São exibidos os diagramas relacionais com as entidades, atributos e relacionamentos que estruturam a base de dados, além do modelo físico representado por meio do schema SQL.

A modelagem de banco de dados é uma etapa fundamental no desenvolvimento de sistemas, pois define a estrutura lógica e física para armazenamento, relacionamento e organização das informações utilizadas pela aplicação.

A modelagem do banco de dados do sistema **Certifica** foi projetada para refletir as principais regras de negócio envolvidas no gerenciamento de eventos acadêmicos e na emissão de certificados. A imagem abaixo apresenta o modelo lógico do banco, incluindo as entidades, atributos e os relacionamentos entre as tabelas.

<div align="center">
  <sub> Figura 1: Modelo Lógico do Banco de Dados </sub>

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


### 3.1.1 BD e Models 

Esta seção (3.1.1) descreve os Models implementados no sistema web. 

**User**

Representa os usuários do sistema, responsáveis por se inscreverem e participarem de eventos.

Atributos:
- id: Identificador único do usuário
- nome: Nome do usuário
- email: Endereço de e-mail do usuário
- senha_hash: Senha criptografada

**Registration**

Registra a inscrição de um usuário em um evento, além do controle de presença e check-in.

Atributos:
- id: Identificador da inscrição
- usuario_id: FK para o usuário
- evento_id: FK para o evento
- status_presenca: Presença confirmada ou não
- codigo_checkin: Código utilizado para realizar o check-in no evento

**Event**

Representa os eventos cadastrados na plataforma.

Atributos:
- id: Identificador do evento
- nome: Nome do evento
- descricao: Breve descrição do evento
- data: Data de realização
- local: Local onde ocorrerá
- duracao_horas: Duração do evento
- entidade_id: FK para a entidade organizadora

**Entity**

Define as entidades responsáveis pela organização dos eventos, como universidades, empresas ou centros acadêmicos.

Atributos:
- id: Identificador da entidade
- nome: Nome da entidade
- tipo: Tipo (ex: "Universidade", "Empresa", etc.)

**Certificate**

Armazena as informações dos certificados emitidos para os participantes dos eventos.

Atributos:
- id: Identificador do certificado
- usuario_id: FK para o usuário
- evento_id: FK para o evento
- link_pdf: Link para o PDF do certificado
- data_emissao: Data de emissão do certificado

### 3.2. Arquitetura

Esta seção (3.2) apresentará o diagrama de arquitetura da sua solução da aplicação web.

A aplicação web foi desenvolvida seguindo a arquitetura MVC (Model-View-Controller), comko representado no diagrama abaixo.

<div align="center">
  <sub> Figura 2: Diagrama de Arquitetura MVC </sub>

![Diagrama](https://res.cloudinary.com/dwewomj84/image/upload/v1749422867/Editor___Mermaid_Chart-2025-06-08-224347_jvdncb.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

A View é composta pelas páginas da aplicação acessadas pelo cliente via navegador. Através de rotas específicas (`/usuarios`, `/eventos`, `/entidades`), o cliente interage com a aplicação, enviando requisições HTTP. Essas requisições são recebidas pela camada Controller, responsável por tratar os dados recebidos, aplicar as regras de negócio e acionar a camada Model.

A Model representa as entidades centrais do sistema (usuário, evento, entidade), sendo responsável tanto pela lógica de negócio quanto pela comunicação com o banco de dados (PostgreSQL). O fluxo de dados ocorre da View → Controller → Model e retorna da Model → Controller → View com as respostas que atualizam a interface ou confirmam ações executadas.

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints

Esta seção (3.6) apresentará os endpoints, que são URLs específicas que permitem a comunicação com uma API. Cada endpoint:

- Representa uma operação do sistema (criar, ler, atualizar ou deletar dados)
- Combina um método HTTP (GET, POST, PUT, DELETE) com um caminho (ex: /usuario)
- Segue o padrão REST para integração entre aplicações

Abaixo estão detalhados todos os endpoints disponíveis na API, organizados por funcionalidade.

#### Endpoints da API

**Usuários:**

- **GET** `/usuarios` – Lista todos os usuários
- **GET** `/usuarios/:id` – Obtém um usuário específico pelo ID
- **POST** `/usuarios` – Cria um novo usuário
- **PUT** `/usuarios/:id` – Atualiza um usuário existente
- **DELETE** `/usuarios/:id` – Remove um usuário

**Entidades:**

- **GET** `/entidades` – Lista todas as entidades
- **GET** `/entidades/:id` – Obtém uma entidade específica pelo ID

**Eventos:**

- **GET** `/eventos` – Lista todos os eventos
- **GET** `/eventos/:id` – Obtém um evento específico pelo ID
- **POST** `/eventos` – Cria um novo evento
- **PUT** `/eventos/:id` – Atualiza um evento existente
- **DELETE** `/eventos/:id` – Remove um evento

**Inscrições:**

- **GET** `/inscricoes` – Lista todas as inscrições
- **GET** `/inscricoes/:id` – Obtém uma inscrição específica pelo ID
- **POST** `/inscricoes` – Cria uma nova inscrição
- **PUT** `/inscricoes/:id` – Atualiza o status de presença e check-in da inscrição
- **DELETE** `/inscricoes/:id` – Remove uma inscrição

**Certificados:**

- **GET** `/certificados` – Lista todos os certificados
- **GET** `/certificados/:id` – Obtém um certificado específico pelo ID

#### Exemplo de requisição

**Criar um usuário (POST):**

``` javascript
{
  "nome": "Jeniffer Soares",
  "email": "jeniffer.soares@gmail.com",
  "senha_hash": "1234"
}
```

### 3.7 Interface e Navegação 

Esta seção (3.7) apresentará o frontend do sistema web. 

Nessa entrega, foi desenvolvido o frontend e a integração com o backend de algumas das telas do projeto Certifica, como: página inicial, de cadastro, de eventos e de novo evento. Abaixo é possível visualizar imagens de cada uma das telas citadas. 

Na página inicial, que apresenta a logo principal do Certifica, há 3 botões: "Sobre nós", "Entrar" e "Cadastrar".

<div align="center">
  <sub> Figura 2: Menu incial </sub>

![Página Inicial](https://res.cloudinary.com/dwewomj84/image/upload/v1749211000/Captura_de_tela_2025-06-06_085600_prxnc6.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

Ao apertar "Sobre nós", há direcionamento para a tela abaixo, que explica um pouco sobre o projeto Certifica. 

<div align="center">
  <sub> Figura 3: Tela de Sobre Nós </sub>

![Sobre nós](https://res.cloudinary.com/dwewomj84/image/upload/v1749221951/Captura_de_tela_2025-06-06_115849_ccptk9.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

O botão "Cadastrar" redigeciona para a tela de cadastro de usuários. Além disso, nessa etapa, é possível se agregar a uma entidade (liga estudantil, clube, empresa, entre outros) caso seja parte de alguma.

<div align="center">
  <sub> Figura 4: Tela de Cadastro 1 </sub>

![Cadastro](https://res.cloudinary.com/dwewomj84/image/upload/v1749325346/Captura_de_tela_2025-06-07_164213_mkzbep.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

<div align="center">
  <sub> Figura 5: Tela de Cadastro 2 </sub>

![Cadastro](https://res.cloudinary.com/dwewomj84/image/upload/v1749325376/Captura_de_tela_2025-06-07_164240_bmbzeo.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

O botão 'Entrar" redireciona para a tela principal do site, onde é possível visualizar os eventos criados e suas informações, e, futuramente, será possível se inscrever neles.

<div align="center">
  <sub> Figura 6: Tela de Eventos </sub>

![Eventos](https://res.cloudinary.com/dwewomj84/image/upload/v1749325628/Captura_de_tela_2025-06-07_164653_d861ug.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

Na tela de Eventos, há o botão "Criar Novo Evento" que redireciona para a tela de criar um novo evento. 

<div align="center">
  <sub> Figura 7: Tela de criar novos eventos </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1749325865/Captura_de_tela_2025-06-07_165053_na2cdv.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

No momento, qualquer usuário pode criar um novo evento. Entretanto, quando o sistema de login estiver implementado, apenas os usuários agregados à uma entidade poderão criar eventos.

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web 

### 4.1 Demonstração do Sistema Web

Esta seção mostra o desenvolvimento do sistema web completo.

Vídeo demonstrativo: <>

O sistema Certifica foi desenvolvido como uma plataforma web para organização e participação em eventos acadêmicos, com foco em facilitar a geração e gestão de certificados. A seguir, apresentamos as principais telas e funcionalidades implementadas, junto de uma breve explicação técnica do funcionamento de cada parte.

A primeira tela acessada é a landing page, que serve como uma introdução ao sistema. Ela direciona os usuários para realizar login ou cadastro.

<div align="center">
  <sub> Figura 8: Landing Page </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750287446/Captura_de_tela_2025-06-18_195713_u2manx.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

A **tela de login** permite que usuários registrados acessem o sistema. No backend, essa funcionalidade utiliza sessões com `express-session`. Quando um usuário se autentica com sucesso, seus dados são armazenados na sessão, permitindo que o sistema reconheça o usuário em diferentes páginas.

<div align="center">
  <sub> Figura 9: Tela de Login </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750287537/Captura_de_tela_2025-06-18_195845_q3cczb.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

A **tela de cadastro** permite a criação de uma nova conta de usuário. Inicialmente, a vinculação a uma entidade era feita aqui, mas esse processo foi transferido para a página de perfil para deixar o cadastro mais simples e organizado.

<div align="center">
  <sub> Figura 10: Tela de Cadastro </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750287617/Captura_de_tela_2025-06-18_200004_ykw8m2.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

O sistema Certifica conta com uma barra lateral de navegação que facilita o acesso às principais funcionalidades da plataforma. Essa barra inclui os links para:

- Todos os eventos
- Meus eventos
- Eventos inscritos
- Perfil
- Logout

Foi utilizado o mesmo código para a barra lateral, como é possível observar abaixo. Ele foi utilizado em todos os arquivos .ejs, apenas alterando a colocação da tela que estava atualmente selecionada pela classe "nav-link active".

```.ejs
    <li><a href="/eventos" class="nav-link" data-section="todos-eventos">Todos os Eventos</a></li>
    <li><a href="/inscricoes/inscritos" class="nav-link" data-section="inscritos">Eventos Inscritos</a></li>
    <li><a href="/eventos/meus-eventos" class="nav-link" data-section="meus-eventos">Meus Eventos</a></li>
    <li><a href="/usuarios/perfil" class="nav-link active" data-section="perfil">Perfil</a></li>
    <li><a href="/" class="nav-link logout" onclick="return clearCache()">Logout</a>
```
Cada uma dessas seções possui uma interface dedicada:

Na tela **Todos os eventos**, o usuário pode visualizar uma lista dos eventos disponíveis na plataforma. A lista foi reformulada para exibir apenas informações básicas, sendo possível clicar em um evento para abrir um modal com detalhes completos, como data, entidade organizadora, local, duração e descrição.

<div align="center">
  <sub> Figura 8: Tela de todos os eventos </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750286737/Captura_de_tela_2025-06-18_194501_sxewtw.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

<div align="center">
  <sub> Figura 9: Tela de todos os eventos com detalhes </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750286809/Captura_de_tela_2025-06-18_194636_lqq2y7.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

A tela **Meus eventos** exibe os eventos que o usuário criou ou que pertencem à entidade da qual ele faz parte, possibilitando um melhor controle e visualização.

<div align="center">
  <sub> Figura 10: Tela de Meus Eventos </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750286899/Captura_de_tela_2025-06-18_194808_s3vxcw.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

Nessa tela, também há um botão de "Criar Novo Evento" que redireciona para a seguinte tela: 

<div align="center">
  <sub> Figura 11: Tela de criar novo evento </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750287028/Captura_de_tela_2025-06-18_195015_xhyjxl.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

Em **Eventos inscritos**, o usuário encontra a lista dos eventos nos quais se inscreveu, facilitando o acompanhamento de sua participação.

<div align="center">
  <sub> Figura 12: Tela de eventos inscritos </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750287116/Captura_de_tela_2025-06-18_195139_zmaadj.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

A seção **Perfil** reúne as informações pessoais do usuário e a vinculação com a entidade. A mudança mais significativa aqui foi a transferência da gestão da vinculação com a entidade do cadastro para essa página, trazendo maior organização e clareza.

<div align="center">
  <sub> Figura 13: Tela de perfil </sub>

![Novo Evento](https://res.cloudinary.com/dwewomj84/image/upload/v1750287201/Captura_de_tela_2025-06-18_195309_tpuaku.png) 
  <sup> Fonte: Autoral, 2025</sup>
</div>

Por fim, o botão **Logout** realiza o redirecionamento para a página inicial, embora o logout real ainda precise ser implementado para encerrar a sessão do usuário.

### 4.2 Conclusões e Trabalhos Futuros

O projeto Certifica apresenta uma solução inicial funcional para a gestão de eventos e perfis de usuários, permitindo a criação e visualização dos eventos de maneira organizada e intuitiva. Entre os pontos fortes, destacam-se a interface amigável para visualização dos eventos e a estrutura básica para cadastro e autenticação de usuários, o que já proporciona uma experiência inicial consistente para os organizadores e participantes.

No entanto, o sistema ainda apresenta algumas limitações que podem ser aprimoradas nas próximas versões. Um ponto importante que ficou pendente é a implementação de uma funcionalidade de check-in nos eventos, que permita confirmar a presença dos inscritos e, consequentemente, a geração automática de certificados, que ficariam disponíveis para download diretamente no site. Essa funcionalidade aumentaria o valor prático da plataforma para os usuários.

Além disso, a parte de criação de eventos carece de funcionalidades essenciais, como a possibilidade de editar e deletar eventos já criados, garantindo maior controle e flexibilidade para os organizadores. Também é necessário melhorar a gestão de permissões, de modo que apenas usuários vinculados a uma entidade autorizada possam criar e gerenciar eventos, aumentando a segurança e a organização da plataforma.

Outro ponto a ser aprimorado é o sistema de logout, que atualmente apenas redireciona a página, mas não encerra efetivamente a sessão do usuário, deixando a conta ainda ativa. Implementar um logout que invalide a sessão garantirá maior segurança e confiabilidade para os usuários.

Por fim, sugere-se a ampliação das interfaces com maior separação entre as funcionalidades para diferentes perfis de usuários (organizadores, inscritos e visitantes), possibilitando uma experiência mais customizada e eficiente.


## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

