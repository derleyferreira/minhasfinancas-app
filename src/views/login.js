import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import axios from 'axios'
import LocalStorageService from '../app/service/localstorageService'
import {mensagemErro} from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        senha: ''        
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }


    entrar = () =>{

     /*   axios.post('hhtp://localhost:8080/api/usuarios/autenticar',{
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
            this.props.history.push("/home")
        }).catch(erro => {
            console.log(erro.response)
        });
*/

        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data);
            this.props.history.push("/home")
        }).catch(erro => {
            mensagemErro(erro.response.data)
        });
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

   render(){
      return(
        
        <div className="row">
            <div className="col-md-6" style={ {position:'relative', left:'300px'} }>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup Label="Email:*">
                                            <input  type="email" 
                                                    className="form-control" 
                                                    id="exampleInputEmail"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email"/>
                                                
                                        </FormGroup>

                                        <FormGroup Label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password"
                                                   className="form-control" 
                                                   value={this.state.senha}
                                                   onChange={e=> this.setState({senha: e.target.value})}
                                                   id="exampleInputPassword1" 
                                                   placeholder="Password"/>
                                        </FormGroup>
                                        <br/>
                                        <button onClick={this.entrar} className='btn btn-success'>
                                        <i className="pi pi-sign-in"></i> Entrar </button>
                                        <button onClick={this.prepareCadastrar} className='btn btn-danger'> 
                                        <i className="pi pi-plus"></i>  Cadastrar </button>

                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>            
    
      )
   }

}

export default withRouter(Login)