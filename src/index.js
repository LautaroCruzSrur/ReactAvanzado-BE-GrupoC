import express, { request } from "express";
import 'dotenv/config'
import cors from 'cors'
import morgan from "morgan";

//creamos una instancia de express
const app =express();

// configuramos el puerto en el que se va a ejecutar nuestro back end

app.set('port' , process.env.PORT || 5050 );

//inicializamos el back end

app.listen(app.get('port'), ()=>{
  console.log(`BackEnd 46i listening to  port ${app.get('port')}`);
}).on('error',(error)=>{
  console.log('ERROR:', error);
  process.exit(1);
})

//MIDDELWARRES: condif extras del backend antes de que se ejecuten las rutas

//l-middle nativos de express

app.use(express.json());//permite recibir obj en formato json

app.use(express.urlencoded({extended:true})); //permite recibir paramentros en las rutas

//2-middel 3eros

app.use(morgan('dev')) // esto nos brinda detalles en nuestra terminal

app.use(cors())// nos permite recibir peticiones remotas

//primer endpoint o ruta de prueba

app.get('/test', (req, res)=>{
    console.log('Entro en Get Test');
    // req.setEncoding({'Aqui ira mi respuesta'})
    res.status(200).json({message: 'Aqui ira mi respuesta'});
})