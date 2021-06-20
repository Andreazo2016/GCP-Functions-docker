const BigQuery = require("@google-cloud/bigquery").BigQuery
const instancia = new BigQuery()
const bigQueryEnums = require('./enums')


module.exports = function inserir(linhas) {
  const dataset = instancia.dataset(bigQueryEnums.DATASET_NAME)
  const tabela = dataset.table(bigQueryEnums.TABLE_NAME)

  return tabela.insert(linhas)
}