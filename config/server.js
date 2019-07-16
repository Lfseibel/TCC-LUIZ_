/* importar o modulo do framework express*/
const express = require('express');

/*importar o modulo do express-session*/
const session = require('express-session');

/*importar o modulo do cookie-parser*/
const cookieParser = require('cookie-parser');

/* importar o modulo do consign*/
const consign = require('consign');

/* importar o modulo do body-parser*/
const bodyParser = require('body-parser');

/* importar o modulo do express-validator*/
const expressValidator = require('express-validator');

/* importar o modulo do passport*/
const passport = require('passport');

/* importar o modulo do connect flash*/
const flash = require('connect-flash');

/* importar o modulo do morgan*/
const morgan = require('morgan');

/* iniciar o objeto do express*/
const app = express();

/* setar as variaveis 'view engine' e 'viewa' do express*/
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static*/
app.use(express.static('./app/public'));

/* configurar o middleware body-parser*/
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator*/
app.use(expressValidator());

/* configurar o consign, para fazer o autoload das rotas, models e controllers para o app*/
consign()
	.include('app/routes')
	.then('config/dbConnection.js')//aqui precisa colocar o js pra que o consign entenda que é so esse modulo dentro do config
	.then('app/models')
	.then('app/controllers')
	.into(app);
/* exportar o objeto app*/
module.exports = app;