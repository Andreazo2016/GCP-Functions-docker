const Koa = require('koa')
const conversor = require('basic-auth')
const aplicacao = new Koa()
const processador = require('koa-bodyparser')
const pesquisar = require('../bigquery/pesquisar')

aplicacao.use(processador())
aplicacao.use(async function (contexto) {
  const usuarioEsenha = conversor.parse(contexto.request.headers.authorization)
  const usuario = process.env.USUARIO
  const senha = process.env.SENHA

  if (usuario !== usuarioEsenha.name || senha !== usuarioEsenha.pass) {
    contexto.body = {
      mensagem: 'Acesso negado !!!'
    }
    return
  }
  const { filtro } = contexto.request.body
  contexto.status = 200
  contexto.body = await pesquisar(filtro)
})

aplicacao.listen(3000)
console.log('API está funcionando ....')