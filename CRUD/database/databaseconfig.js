
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',    // Nome de usuário do banco de dados
  host: '127.0.0.1',   // Endereço do servidor do banco de dados
  database: 'trabalho',     // Nome do banco de dados
  password: 'postdba', // Senha do banco de dados
  port: 5432,          // Porta do banco de dados
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
