class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarAtendimento();
  }
  criarAtendimento() {
    const sql =
      "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(50), servico varchar(20) NOT NULL,data datetime NOT NULL, createtime datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))";
    this.conexao.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

module.exports = new Tabelas();
