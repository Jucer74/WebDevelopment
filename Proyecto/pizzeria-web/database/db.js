const mysql = require('mysql2')

const conexion = mysql.createConnection({   //aqui hacemos conexión a nuestra base de datos mysql
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,    //Aqui definimos nuestras variables de entorno como host, user, pass y db
    database : process.env.DB_DATABASE,
})

conexion.connect((error) => {  //en caso de que haya error lo capture y nos muestre el mensaje por consola
    if(error){
        console.log('El error de conexión es:'+error)
        return;
    }
    console.log('Conectado a la base de datos MySQL exitosamente!')
})

module.exports = conexion