import React from "react"

import Card from "../components/card"
import FormGroup from "../components/form-group"
import {withRouter} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService"
import {mensagemSucesso, mensagemErro} from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome : '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService();
    }


    cadastrar = ()=> {

        const { nome, email, senha, senhaRepeticao } = this.state

        const usuario = {nome, email, senha, senhaRepeticao}
        
        try {
            this.service.validar(usuario)
        }catch(erros){
            const msgs = erros.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
        .then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso. Faça o login para acessar o sistema.')
            this.props.history.push('/login')
        })
        .catch(erro => {
            mensagemErro(erro.response)
        })
    }

    cancelar = () => {
        this.props.history.push('/Login');
    }

    render(){
        return (
            
            <Card title = "Cadastro de Usuários">
                <div className="row">   
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup Label="Nome: *" htmlFor="inputNome">
                                <input type="text" id="inputNome" name="nome"
                                className="form-control"
                                onChange={e => this.setState({nome: e.target.value})}/>                                                                    
                            </FormGroup>

                            <FormGroup Label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                        id="inputEmail"
                                        name="email"
                                        className="form-control"
                                        onChange={e=> this.setState({email: e.target.value})}/>
                            </FormGroup>

                            <FormGroup Label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                        id="inputSenha"
                                        name="senha"
                                        className="form-control"
                                        onChange={e=> this.setState({senha: e.target.value})}/>
                            </FormGroup>                                

                            <FormGroup Label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                        id="inputRepitaSenha"
                                        name="repitasenha"
                                        className="form-control"
                                        onChange={e=> this.setState({senhaRepeticao: e.target.value})}/>
                            </FormGroup>                                

                            <button type="button" className="btn btn-success" 
                                onClick={this.cadastrar}> 
                                <i className="pi pi-save"></i> Salvar </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger"> 
                            <i className="pi pi-backward"></i>  Cancelar </button>

                        </div>
                    </div>
                    
                </div>
            </Card>
        
        )
    }
}
export default withRouter(CadastroUsuario)