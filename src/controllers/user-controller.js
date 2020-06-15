const md5 = require('md5')
//const connection = require('../database/connection')
const connection = require('../../mysql').pool
const crypto = require('crypto')
const authorization = require('../services/auth-service')


exports.post = async (req, res) => {

    try {
        /* await connection('acs').insert({
            id: crypto.randomBytes(4).toString('HEX'),
            nome: req.body.nome,
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)

        }) */

        await connection.getConnection((error , conn)=>{
            conn.query(
                'INSERT INTO acs (id, nome, email, senha) VALUES (?,?,?,?)',
                [ crypto.randomBytes(4).toString('HEX'),
                req.body.nome,
                req.body.email,
                md5(req.body.senha + global.SALT_KEY)],
                (error , resultado , field)=>{
                    conn.release();

                    if(error ){
                       return res.status(201).send({error :error , response:null})
                    }
                    res.status(201).send({ message: 'cadastrado com sucesso' })
                }
            )
        })
        //res.status(201).send({ message: 'cadastrado com sucesso' })

    } catch (e) {
        console.log(e);
        res.status(400).send({ message: 'erro ao cadastrar', e });
    }
}

exports.get = async (req, res) => {

    const users = await connection('acs').select('*')
    res.status(201).send(users)
}

exports.getById = async (req, res) => {

    const users = await connection('acs').where().select('*')
    res.status(201).send(users)
}

exports.authentication = async (request, response ,next) => {

    try {

        const email = request.body.email
        const senha = md5(request.body.senha + global.SALT_KEY)


        const user = await connection('acs').where({
            email: email, 
            senha: senha,
        }).first()//.select('id')

        if (!user) {
            response.status(400).send({ message: 'usuario nao encontrado' })}

            const token = await authorization.generateToken({
                email:request.body.email,
                senha:request.body.senha
            });
    
            response.send({
                token: token,
                data:{
                    user
                }
            })
  
            //response.status(200).send(user)
    }
    catch (e) {
        response.send(e);
    }
}

exports.delete = async(req, res) =>{

    const{id} = req.params;
    //const family_id = req.headers.authorization

    try{

    const user = await connection('acs').where('id' , id).delete();

    if (!user){
        res.status(401).send({message:'nao foi possivel deletar'})
    }

    res.status(200).send({message:'deletado'})

}catch(e){
    res.status(401).send({message:'nao foi possivel deletar'})
}
}

