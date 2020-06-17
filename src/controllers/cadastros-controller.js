const valida = require('../validaCPF')
const connection = require('../../mysql').pool
const crypto = require('crypto')

exports.getByCpf = async (req, res) => {

    try {
        var data = await repository.getByCpf(req.params.cpf)
        res.send(data)
    } catch (e) {
        res.status(400).send({ message: 'erro ao buscar cpf', e });
    }

}

exports.post = async (req, res, next) => {

    try {

        await connection.getConnection((error, conn) => {
            if (error) {
                return res.send(400)
            }
            conn.query(
                'INSERT INTO membro (id , nome , cpf , parentesco ,idade , familia_id) VALUE (?,?,?,?,?,?)',
                [crypto.randomBytes(4).toString('HEX'),
                req.body.nome,
                req.body.cpf,
                req.body.parentesco,
                req.body.idade,
                req.headers.authorization],
                (error, resultado) => {
                    conn.release();
                    if (error) {
                        res.status(400).send({ error: error, resultado: null })
                    }

                    res.status(200).send({ message: 'cadastrado com sucesss' })
                }
            )
        })

    } catch (e) {
        res.status(400).send(e)
    }

}

exports.delete = async (req, res) => {

    try {
        await connection.getConnection((error, conn) => {
            if (error) {
                res.send(400);
            }
            conn.query(
                'SELECT * FROM membro WHERE cpf = ?',
                [req.params.cpf],
                (error, resultado) => {
                    conn.release();
                    if (error) {
                        res.status(400).send({ error: error })
                    }
                    if (resultado == 0) {
                        res.status(400).send({ message: 'verifique cpf' })
                    }
                    if (resultado != 0) {

                        conn.query(

                            'SELECT * FROM membro WHERE familia_id = ?', 

                            [req.headers.authorization],

                            (error, resulta) => {
                                conn.release();

                                if (error) {
                                    res.status(400).send({ error: error })
                                }
                                if (resulta == 0) {
                                    res.status(400).send({ message: 'verifique familia' })
                                } 
                                else {
                                    conn.query(
                                        'DELETE FROM membro WHERE cpf = ?',
                                        [req.params.cpf],
                                        (error, resulta2) => {
                                            conn.release();
                                            if (error) {
                                                res.status(400).send({ error: error })
                                            }
                                            if (resulta2) {
                                                res.status(400).send({ message: 'deletado' })
                                            }
                                        }

                                    )
                                }
                            }
                        )
                    }

                }
            )

        })

    } catch (e) {
        res.status(401).send({ message: 'algo deu errado' })
    }


}

exports.update = async (req, res) => {
    try {

        const { cpf } = req.params
        const familia_id = req.headers.authorization

        const membro = await connection('membros')
            .where('cpf', cpf)
            .select('familia_id')
            .first()

        if (membro.familia_id != familia_id) {
            res.status(401).send({ message: 'operação nao permitida' })
        }
        const a = await connection('membros').where('cpf', cpf)
            .update({
                nome: req.body.nome,
                cpf: req.body.cpf,
                parentesco: req.body.parentesco,
                idade: req.body.idade,
                familia_id: familia_id
            })
            .select('familia_id')
        res.status(200).send({ message: 'atualizado' })

    } catch (e) {
        res.status(401).send({ message: 'erro' })
    }
}