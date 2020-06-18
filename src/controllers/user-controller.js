const md5 = require('md5')
const mysql = require('mysql')
const connection = require('../../mysql').pool
const crypto = require('crypto')
const authorization = require('../services/auth-service')


exports.post = async (req, res) => {

    try {
        
        await connection.getConnection((error, conn) => {
            if (error)
                return res.send(400);
            conn.query(
                'INSERT INTO acs (id, nome, email, senha) VALUES (?,?,?,?)',
                [crypto.randomBytes(4).toString('HEX'),
                req.body.nome,
                req.body.email,
                md5(req.body.senha + process.env.USER_KEY)],
                //md5(req.body.senha + global.SALT_KEY)
                (error, resultado, field) => {
                    conn.release();

                    if (error) {
                        return res.status(201).send({
                            error: error,
                            response: null
                        })
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

    await connection.getConnection((error, conn) => {
        if (error)
            return res.send(400);
        conn.query(
            'SELECT * FROM acs',

            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(400).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send(resultado)
            }
        )
    })

}

exports.getById = async (req, res) => {

    await connection.getConnection((error, conn) => {
        if (error)
            return res.send(400);
        conn.query(
            'SELECT id , nome FROM acs WHERE id =?',
            [req.params.id],

            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(201).send({
                        error: error,
                        response: null
                    })
                }
                res.status(201).send(resultado)
            }
        )
    })
}

exports.authentication = async (req, res, next) => {

    
    try {
        
        const email = req.body.email
        const senha = await md5(req.body.senha + process.env.USER_KEY)

        await connection.getConnection((error, conn) => {
            if (error)
                return res.send(400);
            conn.query(
                'SELECT * FROM acs WHERE (email, senha) = (? ,?)',
                [email, senha],

                async (error, resultado, field) => {
                   
                    conn.release();
                    if (resultado.length == 0) {
                        return res.status(400).send({ message: 'usuario nao encontrado' })
                    }

                    if (error) {
                        return res.status(400).send({ message: 'usuario nao encontrado' })
                    }


                    if (resultado) {

                        const token = await authorization.generateToken({
                            email: req.body.email,
                            senha: req.body.senha
                        }) 
                        
                        const {id}  = await resultado[0]

                        res.status(200).send({
                            token: token,
                            id
                        })
                    }


                    //res.status(201).send(resultado)
                }
            )
        })
    } catch (e) {
        res.send(e)
    }

}

exports.delete = async (req, res) => {

    const { id } = req.params;
    await connection.getConnection((error, conn) => {
        if (error)
            return res.send(400);
        conn.query(
            'DELETE FROM acs WHERE id =?',
            [id],

            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(202).send({
                        error: error,

                    })
                }
                res.status(201).send({ message: 'deletado com sucesso' })
            }
        )
    })
}

