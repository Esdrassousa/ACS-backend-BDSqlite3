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

        const familia_id = req.headers.authorization;
        const id = crypto.randomBytes(4).toString('HEX')

        await connection('membros').insert({

            id:id,
            nome: req.body.nome,
            cpf: req.body.cpf,
            parentesco: req.body.parentesco,
            idade: req.body.idade,
            familia_id: familia_id
        })
        


        res.status(201).send(req.body);
    } catch (e) {console.log(e)
        res.status(400).send({ message: 'erro ao tentar cadastrar', e });
    }
    //} else (res.send({ message: 'cpf invalido' }))
}

exports.delete = async (req, res) => {

    try {
        const { cpf } = req.params
        const familia_id = req.headers.authorization;

        const membro = await connection('membros')
            .where('cpf', cpf)
            .select('familia_id')
            .first()

        if (membro.familia_id != familia_id) {
            res.status(401).send({ message: 'operação nao permitida' })
        }
        await connection('membros').where('cpf', cpf).delete();
        res.status(200).send({ message: 'deletado' })

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