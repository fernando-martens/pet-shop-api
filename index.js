const customExpress = require("./config/customExpress");
const conexao = require("./infra/conexao");
const Tabelas = require("./infra/tabelas");
const app = customExpress();

conexao.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("\nš¾ Conectado com o mysql");
    Tabelas.init(conexao);
    app.listen(3000, () => {
      console.log("š Servidor rodando");
    });
  }
});
