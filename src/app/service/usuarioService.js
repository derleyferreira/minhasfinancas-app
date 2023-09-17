import ApiService from '../apiservice'
import ErroValidacao from '../exception/errovalidacao';

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post(this.apiurl +  '/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id){
        return this.get(this.apiurl + `/${id}/saldo`)
    }

    salvar(usuario){
        return this.post(this.apiurl, usuario)
    }

    validar(usuario){
        const msgs = []

        if (!usuario.nome){
            msgs.push('O campo nome deve ser informado.')            
        }

        if (!usuario.email){
            msgs.push('O campo e-mail deve ser informado.')
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('O e-mail informado é inválido.')
        }

        if (!usuario.senha || !usuario.senhaRepeticao){
            msgs.push('Digite a senha duas vezes.')
        } else if (usuario.senha !== usuario.senhaRepeticao){
            msgs.push('As senhas não conferem.')
        }

       if (msgs && msgs.length > 0){
           throw new ErroValidacao(msgs)
       }

    }
}
export default UsuarioService;