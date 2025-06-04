const entityService = require('../services/entityService');

module.exports = {
  async renderRegisterPage(req, res) {
    try {
      const entidades = await entityService.findAll();
      res.render('register', { entidades });
    } catch (error) {
      console.error("Erro ao carregar a página de cadastro:", error);
      res.status(500).send("Erro ao carregar a página de cadastro");
    }
  }
};
