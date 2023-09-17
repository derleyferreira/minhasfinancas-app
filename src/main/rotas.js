import React from 'react'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import consultalancamentos from '../views/lancamentos/consultalancamentos'
import cadastrolancamentos from '../views/lancamentos/cadastrolancamentos'

const isUsuarioAutenticado = () => {
    return false
}

function rotaAutenticada( {component: Component, ...props} ){
    return (
        <Route {...props} render={ (componentProps) => {
            if (isUsuarioAutenticado()){
                return (
                    <Component {...componentProps} />
                )
            }else {                
                <Redirect to={ {pathname: "/Login", state: {from: componentProps.location} } }  />
            }
        }} />
    )
}

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />                
                <Route path="/login" component={Login} />

                <Route path="/home" component={Home} />
                <Route path="/consulta-lancamentos" component={consultalancamentos} />
                <Route path="/cadastro-lancamentos/:id?" component={cadastrolancamentos} />
            </Switch>
        </HashRouter>
    )
}
export default Rotas