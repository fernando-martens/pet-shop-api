const moment = require("moment");
const conexao = require("../infra/conexao");

class Atendimento {
  adiciona(atendimento, res) {
    const createtime = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    const validDate = moment(data).isSameOrAfter(createtime);
    const validName = atendimento.cliente.length >= 5;

    const validations = [
      {
        name: "data",
        valid: validDate,
        message: "Date must be greater than or equal to the current date",
      },
      {
        name: "client",
        valid: validName,
        message: "The customer must be five characters or more",
      },
    ];

    const errors = validations.filter((field) => !field.valid);
    const existErrors = errors.length;

    if (existErrors) {
      res.status(400).json(errors);
    } else {
      const atendimentoDatado = { ...atendimento, createtime, data };
      const sql = "INSERT INTO Atendimentos SET ?";
      conexao.query(sql, atendimentoDatado, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(result);
        }
      });
    }
  }
  lista(res) {
    const sql = "SELECT * FROM Atendimentos";
    conexao.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }
  buscaId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    conexao.query(sql, (error, result) => {
      const atendimento = result[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }
  altera(id, valores, res) {
    const sql = "UPDATE Atendimentos SET ? WHERE id=?";
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }
    conexao.query(sql, [valores, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id, ...valores });
      }
    });
  }
  deleta(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";
    conexao.query(sql, id, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id, status: "success" });
      }
    });
  }
}

module.exports = new Atendimento();
