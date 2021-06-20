const BigQuery = require("@google-cloud/bigquery").BigQuery
const instancia = new BigQuery()
const bigQueryEnums = require('./enums')

module.exports = async function pesquisar(filtro) {

  let query = `SELECT * FROM atividades`

  query = filtro ? query.concat(` WHERE ${filtro}`) : query

  const tabela = instancia.dataset(bigQueryEnums.DATASET_NAME).table(bigQueryEnums.TABLE_NAME)

  const [trabalho] = await tabela.createQueryJob({ query })
  const [resultados] = await trabalho.getQueryResults()
  return resultados

}