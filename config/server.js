// importar o express
let express = require('express');
// importar o consign
let consign = require('consign');
// importar body-parser
let bodyParser = require('body-parser');
// importar express-validator
let expressVal = require('express-validator');

// init express
let app = express();
// setar variavel view engine e views
app.set('view engine', 'ejs');
app.set('views', './app/views');

// configurar middlewares
app.use(express.static('./app/public'));
// configurar middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));
// configurar middleware express-validator
app.use(expressVal());
// configurar AUTOLOADER consign, de models e controllers
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);
// exportar o objeto app
module.exports = app;