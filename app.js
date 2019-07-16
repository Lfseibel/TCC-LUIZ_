/* importar as configurações do servidor*/
const app = require('./config/server');

/* parametrizar a porta de escuta */
const server = app.listen(777, function(){
	console.log('Servidor online');
})

