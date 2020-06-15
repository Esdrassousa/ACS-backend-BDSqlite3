 const Sequilize = require('sequelize')

const sequelize = new Sequilize('heroku_6ac9ab071661142' , 'b9d29dbf4876c1' ,'c127899f',{
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql',
    port: 3306
})

sequelize.authenticate().then(function(){
    console.log('conectado com sucesso')
}).catch(function(erro){
    console.log("erro ao se conectar" + erro)
}) 