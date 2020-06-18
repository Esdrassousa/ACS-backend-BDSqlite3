 const Sequilize = require('sequelize')

const sequelize = new Sequilize(process.env.MYSQL_DATABASE , process.env.MYSQL_USER ,process.env.MYSQL_PASSWORD,{
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
})

sequelize.authenticate().then(function(){
    console.log('conectado com sucesso')
}).catch(function(erro){
    console.log("erro ao se conectar" + erro)
}) 