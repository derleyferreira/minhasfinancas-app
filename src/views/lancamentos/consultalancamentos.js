import React from "react";
import {withRouter} from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import selectMenu from "../../components/selectMenu";
import SelectMenu from "../../components/selectMenu";
import lancamentosTable from "./lancamentosTable";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

import * as messages from '../../components/toastr';

import { ConfirmDialog } from 'primereact/confirmdialog'; 

class ConsultaLancamentos extends React.Component{

    state =  {
        ano: '',
        mes: '',
        tipo: '', 
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    buscar = () => {

        if (!this.state.ano){
            messages.mensagemErro("O ano deve ser informado.")
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
      
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        console.log(lancamentoFiltro)

        this.service.consultar(lancamentoFiltro)
        .then( resposta => {
            if (resposta.data.length <1){
                messages.mensagemAlerta("Nenhum resultado encontrado")
            }
            this.setState({lancamentos: resposta.data})            
        })
        .catch(error => {
            console.log(error)
        })        
    }

    editarAction = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    deleteAction = (Lancamento) => {

    //    console.log('Deletar', Lancamento.id)

        this.service.deletar(Lancamento.id)
        .then(response => {
            const l = this.state.lancamentos;
            const index = l.indexOf(Lancamento)
            l.splice(index,1)
            this.setState(l)
            messages.mensagemSucesso("Lançamento deletado com sucesso")
        })
        .catch(error => {
            messages.mensagemErro(error)
        })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);
            if (index !== -1){
                lancamento['status'] = status;
                lancamentos[index] = lancamento
                this.setState({lancamentos})
            }
            messages.mensagemSucesso("Status atualizado com sucesso")
        })
    }


    render(){
        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        return(
            <Card title="Consulta de Lançamentos">
               <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" Label="Ano: *">
                            <input type="text" 
                                   className="form-control" 
                                   id="inputAno"
                                   value={this.state.ano}
                                   onChange={e => this.setState({ano: e.target.value})}
                                   placeholder="Digite o ano"/>                                
                        </FormGroup>

                        <FormGroup id="inputMes" htmlFor="inputMes" Label="Mês: ">
                            <SelectMenu id="inputMes" 
                                        value={this.state.mes}
                                        onChange={e => this.setState({mes: e.target.value})}
                                        className="form-control" lista={meses} />
                        </FormGroup>

                        <FormGroup htmlFor="inputDesc" Label="Descrição:">
                            <input type="text" 
                                   className="form-control" 
                                   id="inputDesc"
                                   value={this.state.descricao}
                                   onChange={e => this.setState({descricao: e.target.value})}
                                   placeholder="Digite a descrição"/>                                
                        </FormGroup>                        

                        <FormGroup id="inputTipo" htmlFor="inputTipos" Label="Tipo: ">
                            <SelectMenu id="inputTipo"
                                        value={this.state.tipo}
                                        onChange={e => this.setState({tipo: e.target.value})}                            
                                        className="form-control" lista={tipos} />
                        </FormGroup>

                        <button onClick={this.buscar} type="button" className="btn btn-success">
                            <i className="pi pi-search"></i> Buscar</button>
                        <button type="button" onClick={this.preparaFormularioCadastro} className="btn btn-danger">
                        <i className="pi pi-plus"></i> Cadastrar</button>
                    </div>                    
                </div>
               </div>
               <br/>
               <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                            deleteAction={this.deleteAction} editarAction={this.editarAction}
                            alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
               </div>

         
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos)