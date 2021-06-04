const conexao = require("../infra/conexao");
const uploadArquivo = require("../arquivos/uploadArquivos");

class Pet {
    adiciona(pet, res) {
        const sql = "INSERT INTO Pets SET ?";
        uploadArquivo(pet.imagem, pet.nome, (novoCaminho) => {
            const novoPet = { nome: pet.nome, imagem: novoCaminho };
            conexao.query(sql, novoPet, (error) => {
                if (error) res.status(400).json(error);
                else res.status(201).json(novoPet);
            });
        });
    }
}

module.exports = new Pet();