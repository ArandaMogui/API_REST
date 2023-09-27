//Se inicia el módulo express para dar inicio al servidor
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post'); 
const app = express();


app.use(bodyParser.json());
app.use('/alex', postRoutes);

// Se crean las rutas
app.get('/',(req,res)=>{
    res.send('prueba de conexión'); // Esta es la ruta por defecto
});

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://alexM:1057600550@atlascluster.4t1rcnm.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
        app.listen(1000);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

