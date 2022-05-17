const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const hostname = "127.0.0.1";

const port = 3052;
const sqlite3 = require("sqlite3").verbose();
const app = express();
const DBPATH = "dbUser.db";

app.use(express.static("../frontend/"));

app.use(express.json());

/* Definição dos endpoints */
app.get("/profissional", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let profissionalCpf = req.query.cpf || "";

  let profissionalObj = {
    nome: "",
    experiencia: [],
  };

  let db = new sqlite3.Database(DBPATH);
  let sql =
    "SELECT nome, * FROM profissionais, experiencia WHERE profissionais.Cpf=?;";
  let params = [profissionalCpf];
  db.all(sql, params, (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      profissionalObj.nome = rows[0]["nome"];
      profissionalObj.experiencia = rows.map((experienciaObj) => {
        return {
          empresa: experienciaObj["Empresa"],
          data: experienciaObj["Data"],
        };
      });
    }
    res.json(profissionalObj);
  });
  db.close();
});

app.post("/profissional/experiencia", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let experience = {
    cpf: req.body.cpf,
    empresa: req.body.empresa,
    data: req.body.data,
  };

  sql = "INSERT INTO experiencia (cpf, empresa, data) VALUES (?,?,?)";
  let db = new sqlite3.Database(DBPATH);
  let params = [experience.cpf, experience.empresa, experience.data];
  db.run(sql, params, (err) => {
    if (err) {
      throw err;
    }
  });
  db.close();
  res.end();
});

app.post("/profissional", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let profissional = {
    nome: req.body.nome,
    cpf: req.body.cpf,
  };

  sql = "INSERT INTO profissionais (nome, cpf) VALUES (?,?)";
  let db = new sqlite3.Database(DBPATH);
  let params = [profissional.nome, profissional.cpf];
  db.run(sql, params, (err) => {
    if (err) {
      throw err;
    }
  });
  db.close();
  res.end();
});

/* Inicia o servidor */
app.listen(port, hostname, () => {
  console.log(`BD server running at http://${hostname}:${port}/`);
});
