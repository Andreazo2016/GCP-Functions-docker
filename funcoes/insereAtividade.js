const inserir = require('../bigquery/inserir')
module.exports = async function insereAtividade(evento) {
  try {
    const atividadeCodificada = evento.data
    const json = Buffer.from(atividadeCodificada, 'base64').toString()
    const atividade = JSON.parse(json)
    await inserir(atividade)
  } catch (error) {
    console.error(error)
    console.error(JSON.stringify(error.response))
  }
}