const md5 = require('md5')
const connection = require('../database/connection')
const crypto = require('crypto')
const knex = require('knex')

exports.post = async (req, res) => {

    try {
        await connection('ACS').insert({
            id: crypto.randomBytes(4).toString('HEX'),
            nome: req.body.nome,
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)

        })
        res.status(201).send({ message: 'cadastrado com sucesso' })

    } catch (e) {
        console.log(e);
        res.status(400).send({ message: 'erro ao cadastrar', e });
    }
}

exports.get = async (req, res) => {

    const users = await connection('ACS').select('*')
    res.status(201).send(users)
}

exports.getById = async (req, res) => {

    const users = await connection('ACS').where().select('*')
    res.status(201).send(users)
}

exports.authentication = async (request, response ,next) => {

    try {

        const email = request.body.email
        const senha = md5(request.body.senha + global.SALT_KEY)


        const user = await connection('ACS').where({
            email: email, 
            senha: senha,
        }).first()//.select('id')

        if (!user) {
            response.status(400).send({ message: 'usuario nao encontrado' })}
  
            response.status(200).send(user)
    }
    catch (e) {
        response.send(e);
    }
}
