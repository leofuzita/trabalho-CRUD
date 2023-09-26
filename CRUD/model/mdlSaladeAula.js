const db = require("../database/databaseconfig");

const getAllSalasDeAula = async () => {
  
  return (
    await db.query(
      "SELECT *FROM salasdeaula WHERE removido = false ORDER BY salasdeaulaid ASC;"
    )
  ).rows;
};

const getSalasDeAulaByID = async (salaIDPar) => {
    
    return (
      await db.query("SELECT *FROM salasdeaula WHERE salasdeaulaid = $1 AND removido = false;",[salaIDPar])
    ).rows;
  };


  const insertSalasDeAula = async (novaSalaDeAula) => {
    let linhasAfetadas;
    let msg = "ok";
  
    try {
        linhasAfetadas = (
            await db.query("INSERT INTO salasdeaula (descricao, localizacao, capacidade, removido) VALUES ($1, $2, $3, $4) RETURNING salasdeaulaid;",
        [
        novaSalaDeAula.descricao,
        novaSalaDeAula.localizacao,
        novaSalaDeAula.capacidade,
        novaSalaDeAula.removido,
      ])).rowCount;
    } catch (error) {
     
      msg = "[mdlSalas|insertSalas] " + error.detail;
      linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
  };


  const updateSalasDeAula = async (salaDeAulaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE salasdeaula SET " +
          "descricao = $2, " +
          "localizacao = $3, " +
          "capacidade = $4, " +
          "removido = $5 " +
          "WHERE salasdeaulaid = $1",
          [
            salaDeAulaREGPar.salasdeaulaid,
            salaDeAulaREGPar.descricao,
            salaDeAulaREGPar.localizacao,
            salaDeAulaREGPar.capacidade,
            salaDeAulaREGPar.removido,
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlSalasDeAula|UpdateSalasDeAula] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };
  

  const deleteSalasDeAula = async (salaDeAulaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      
      linhasAfetadas = (
        await db.query(
          "UPDATE salasdeaula SET " +
          "removido = true " +
          "WHERE salasdeaulaid = $1",
          [salaDeAulaREGPar.salasdeaulaid]
        )
      ).rowCount;
    } catch (error) {
      
      msg = "[mdlSalasDeAula|deleteSalasDeAula] " + error.message;
      linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
  };
  
  

  module.exports = {
    getAllSalasDeAula,
    getSalasDeAulaByID,
    insertSalasDeAula,
    updateSalasDeAula,
    deleteSalasDeAula
  };
  