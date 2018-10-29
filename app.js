// importar as configuracoes do server
let app = require('./config/server');
// parametrizar porta de escuta
let server = app.listen(8080, function () {
    console.log('SERVER ON');
});
let io  = require('socket.io').listen(server);
app.set('io', io);
// criar conn websocket
io.on('connection', function(socket){
    console.log('Usuário Conectado');
    socket.on('disconnect', function(){
        console.log('Usuário desconectado');
    });
    socket.on('msgToServer', function(data){
       socket.emit(
           'msgToClient',
           {apelido: data.apelido, mensagem: data.mensagem}
           );
        // /** @namespace socket.broadcast */
        socket.broadcast.emit(
            'msgToClient',
            {apelido: data.apelido, mensagem: data.mensagem}
            );
        // participantes
        if (parseInt(data.apelido_atualizado) == 0) {
            socket.emit(
                'participantesToClient',
                {apelido: data.apelido}
            );
            // /** @namespace socket.broadcast */
            socket.broadcast.emit(
                'participantesToClient',
                {apelido: data.apelido}
            );
        }
    });
});
