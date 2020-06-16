 const Sequilize = require('sequelize')

const sequelize = new Sequilize('test' , 'root' ,'',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
})

sequelize.authenticate().then(function(){
    console.log('conectado com sucesso')
}).catch(function(erro){
    console.log("erro ao se conectar" + erro)
}) 