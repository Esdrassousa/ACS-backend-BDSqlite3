
//const connection = require('../database/connection')
const connection = require('../../mysql').pool

exports.post = async(req, res)=>{

    try{

        const ACS_id = req.headers.authorization;

         await connection('familia').insert({
            id:req.body.id,
            numero:req.body.numero,
            ACS_id: ACS_id
        
        })
        
        res.status(201).send(req.body)

    }catch(e){
        console.log(e);
        res.status(400).send({ message: 'erro ao cadastrar', e });
    }    
}


exports.get = async (req, res)=>{

    const users = await connection('familia').select('*')
    res.status(201).send(users)
}
exports.getById = async (req, res)=>{
    const id = req.body.id;
    const users = await connection('familia').where('id',id).first()
    res.status(201).send(users)
}

exports.create = async (request, response ,next) => {

    try {

        const id = request.body.id
        

        const user = await connection('familia').where({
            id: id, 
            
        }).first().select('*')

        if (!user) {
            response.status(400).send({ message: 'usuario nao encontrado' })}
  
        response.status(200).send(user)
    }
    catch (e) {
        response.send(e);
    }
}

exports.buscaFamilia = async(req, res)=>{
    
try{
    const familia_id = req.headers.authorization;


    const users = await connection('membros').where('familia_id', familia_id).select('*')
    res.status(201).send(users) 
    //console.log(e)
}catch(e){
    
    res.status(201).send(e)  
}
}

exports.delete = async(req, res) =>{

    const{id} = req.params;
    //const family_id = req.headers.authorization

    try{

    const family = await connection('familia').where('id' , id).delete();

    if (!family){
        res.status(401).send({message:'nao foi possivel deletar'})
    }

    

    res.status(200).send({message:'deletado'})

}catch(e){
    res.status(401).send({message:'nao foi possivel deletar'})
}
}


/* exports.getById = async(req, res) =>{
    try{
        var data = await repositore.getById(req.params.id)
        res.status(200).send(data)
    }catch(e){
        res.status(400).send({ message: 'erro ao buscar id', e });
    }

} */