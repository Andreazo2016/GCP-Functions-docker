const pubsub = require('./pubsub')


module.exports = async function recebeAtividade(requisicao, resposta) {
  const atividade = requisicao.body

  const fields = [
    'data_criacao_atividade',
    'tipo_de_atividade',
    'nome_do_curso',
    'nome_da_aula',
    'texto',
  ]
  fields.forEach(field => {
    if (!atividade.hasOwnProperty(field)) {
      resposta.send(`O campo ${field} não foi enviado.:(`)
      return
    }
  })

  const resultado = await pubsub(atividade, 'atividades')

  resposta.send(resultado)
}