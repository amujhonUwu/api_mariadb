const express = require('express');
const morgan = require('morgan')
const app = express();

// variables
PORT = 3000

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewears
app.use(morgan('dev'));
app.use(express.urlencoded({extender: false}));
app.use(express.json());


// Rutas
app.use(require('./routes/index'));
app.use('/api/clientes', require('./routes/cliente'))

// Ejecutador
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

