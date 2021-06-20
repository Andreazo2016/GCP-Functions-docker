const PubSub = require("@google-cloud/pubsub").PubSub

const instance = new PubSub()

module.exports = function pubsub(dados, topico) {
  if (typeof dados !== 'string') {
    dados = JSON.stringify(dados)
  }

  dados = Buffer.from(dados)

  return instance.topic(topico).publish(dados)
}