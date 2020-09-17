const express = require("express");
const Sequelize = require('sequelize');
const requireDir = require("require-dir");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

var sequelize = new Sequelize('drj55vn7c0l36', 'fcaqeicsrqrwzg', 'bd8eb106388752416a310b8ca07ac2f1b87011a45764b9e3e43b6ea0f53024e1', {
    host: 'ec2-54-156-121-142.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: '5432',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        native: true
      }
  });

sequelize.sync().then(
    () => {
        console.log('Rodando na porta 3000');
        console.log('Conectado com o banco sucesso!');
    },
    (error) => {
    console.log('Erro ao conectar ao banco' , error);
});

app.get('/', (err, res) => {
	res.status(200);
	res.json({ working: true });
	res.end();
});

requireDir("./src/models");
app.use("/api", require("./src/routes"));
app.listen(process.env.PORT || 3000);

module.exports = {
    app,
    sequelize
};