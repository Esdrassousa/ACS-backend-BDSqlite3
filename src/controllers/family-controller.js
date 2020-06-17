
const connection = require('../../mysql').pool

exports.post = async (req, res) => {

    const ACS_id = req.headers.authorization;
    try {

        await connection.getConnection((error, conn) => {
            if (error)
                return res.send(400);
            conn.query(
                'INSERT INTO familia (id , numero, user_id) VALUES (?,?,?)',
                [req.body.id,
                req.body.numero,
                    ACS_id],
                (error, resultado, field) => {
                    conn.release();

                    if (error) {
                        return res.status(400).send({
                            error: error,
                            response: null
                        })
                    }
                    res.status(201).send({ message: 'cadastrado com sucesso' })
                }
            )
        })

    } catch (e) {
        console.log(e);
        res.status(400).send({ message: 'erro ao cadastrar', e });
    }

}

exports.get = async (req, res) => {

    try {

        await connection.getConnection((error, conn) => {
            if (error) {
                return res.send(400)
            }
            conn.query(
                'SELECT * FROM familia',
                (error, resultado) => {
                    conn.release()

                    if (error) {
                        return res.status(400).send({ erro: error, resultado: null })
                    }
                    return res.status(200).send(resultado)

                }
            )
        })

    } catch (e) {
        res.status(401).send(e)
    }
}
exports.getById = async (req, res) => {
    const id = req.body.id;
    const users = await connection('familia').where('id', id).first()
    res.status(201).send(users)
}

exports.create = async (req, res, next) => {

    try {

        await connection.getConnection((error, conn) => {
            if (error) {
                return res.send(400);
            }
            conn.query(
                'SELECT * FROM familia WHERE id = ?',
                [req.body.id],
                (error, resultado) => {
                    conn.release();
                    if (error) {
                        return res.status(400).send({ message: 'erro ao buscar usuario' })
                    }
                    if (resultado == 0) {
                        return res.status(404).send({ error: 'nao existe familia' })
                    }
                    res.status(200).send(resultado)
                })
        })

    } catch (e) {
        res.status(400).send(e)
    }
}

exports.buscaFamilia = async (req, res) => {

    try {

        await connection.getConnection((error, conn) => {
            if (error) {
                res.send(400);
            }
            conn.query(
                'SELECT * FROM membro WHERE familia_id =?',
                [req.headers.authorization],
                (error, data) => {
                    conn.release();
                    if (error) {
                        return res.status(400).send({ error: error, data: null })
                    }
                    if (data == 0) {
                        return res.status(202).send({ message: "sem usuario" })
                    }
                    res.status(200).send(data)
                }
            )
        })

    } catch (e) {

    }
}

exports.delete = async (req, res) => {

    try {

        await connection.getConnection((error, conn) => {
            if (error) {
                res.send(400)
            }
            conn.query(
                'SELECT id FROM familia WHERE id = ?',
                [req.params.id],
                (error, resultado) => {
                    conn.release();
                    if (error) {
                        return res.status(400).send({ error: error })
                    }
                    if (resultado == 0) {
                        res.status(400).send({ message: 'id nao encontrado' })
                    }
                    else {
                        conn.query(
                            'DELETE FROM familia WHERE id = ?',
                            [req.params.id,
                            ],
                            (error, resultado) => {
                                conn.release();
                                if (error) {
                                    res.status(400).send({ error: error })
                                }
                                if (resultado == 0) {
                                    res.status(400).send({ message: 'id nao encontrado' })
                                }
                                res.status(400).send({ message: 'deletado com sucesso' })
                            }
                        )
                    }
                }
            )


        })

    } catch (e) {
        res.status(400).status(e)
    }
}
