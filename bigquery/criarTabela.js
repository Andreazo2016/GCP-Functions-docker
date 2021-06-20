const BigQuery = require("@google-cloud/bigquery").BigQuery
const instancia = new BigQuery()
const bigQueryEnums = require('./enums')

async function criarTabela() {
  const dataset = instancia.dataset(bigQueryEnums.DATASET_NAME)
  const [tabelas] = await dataset.getTables()
  const tabelasEncontradas = tabelas.filter(function (tabelaAtual) {
    return tabelaAtual.id === bigQueryEnums.TABLE_NAME
  })

  if (tabelasEncontradas.length > 0) {
    console.log(`${bigQueryEnums.TABLE_NAME} tabela já foi criado!!`)
    return
  }

  const estrutura = [
    {
      name: "data_criacao_atividade",
      type: 'timestamp',
      mode: 'required'
    },
    {
      name: "tipo_de_atividade",
      type: 'string',
      mode: 'required'
    },
    {
      name: "nome_do_curso",
      type: 'string',
      mode: 'required'
    },
    {
      name: "nome_da_aula",
      type: 'string',
      mode: 'required'
    },
    {
      name: "texto",
      type: 'string',
      mode: 'required'
    },
    {
      name: "id_atividade_principal",
      type: 'integer',
      mode: 'nullable'
    },

  ]

  await dataset.createTable(bigQueryEnums.TABLE_NAME, { schema: estrutura })
  console.log(`${bigQueryEnums.TABLE_NAME} criado com sucesso!!`)

}

criarTabela()