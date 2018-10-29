module.exports.initChat = function(application, req, res){
    let dadosForm = req.body;

    console.log(dadosForm);
    req.assert('apelido', 'Nome Obrigatório').notEmpty();
    req.assert('apelido', 'O Nome deve ter entre 3 e 15 caracteres').len(3, 15);

    let errors = req.validationErrors();
    if (errors){
        res.render('index', {validacao: errors});
        return;
    }

    application.get('io').emit(
        'msgToClient',
        {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
    );
    res.render('chat', {dadosForm: dadosForm});
}