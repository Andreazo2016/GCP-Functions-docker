const BigQuery = require("@google-cloud/bigquery").BigQuery
const instancia = new BigQuery()
const bigQueryEnums = require('./enums')


async function criarDataset() {
  const [datasets] = await instancia.getDatasets()

  const datasetsFiltrados = datasets.filter(function (datasetAtual) {
    return datasetAtual.id === bigQueryEnums.DATASET_NAME
  })

  if (datasetsFiltrados.length > 0) {
    console.log(`${bigQueryEnums.DATASET_NAME} dataset já foi criado!!`)
    return
  }

  await instancia.createDataset(bigQueryEnums.DATASET_NAME)
  console.log(`${bigQueryEnums.DATASET_NAME} criado com sucesso!!`)


}

criarDataset()