//Archivo para arrancar la aplicacion

//Creo el servidor por donde se va a desplegar la aplicacion con ayuda de express
//https:localhost/4000
import app from './app.js'
import {connectDB} from "./db.js"

connectDB();
app.listen(4000)
console.log("Server on port", 4000)