const fs = require("fs");

module.exports = (caminho, nomeArquivo, callback) => {
    const novoCaminho = `./assets/imagens/${nomeArquivo}`;
    fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on("finish", () => {
            callback(novoCaminho);
        });
};