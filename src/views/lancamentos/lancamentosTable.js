import React from "react";
import currencyFormatter from "currency-formatter";
import "primeicons/primeicons.css"

export default props => {

    const rows = props.lancamentos.map(Lancamento => {
        return (
            <tr key = {Lancamento.id}>
                <td>{Lancamento.descricao}</td>
                <td>{currencyFormatter.format(Lancamento.valor, {locale: "pt-BR"})   } </td>
                <td>{Lancamento.tipo}</td>
                <td>{Lancamento.mes}</td>
                <td>{Lancamento.status}</td>
                <td>
                    <button type="button"
                        className="btn btn-success" 
                        disabled={Lancamento.status !== 'PENDENTE'}
                        title="Efetivar"
                        onClick={e => props.alterarStatus(Lancamento, 'EFETIVADO')}>
                        <i className="pi pi-check"></i>
                    </button>
                    
                    <button type="button"
                            title="Cancelar"
                            disabled={Lancamento.status !== 'PENDENTE'}
                            className="btn btn-warning" onClick={e => props.alterarStatus(Lancamento, 'CANCELADO')}>
                        <i className="pi pi-times"></i>
                    </button>

                    <button type="button" className="btn btn-primary"
                            title="Editar"
                            onClick={e => props.editarAction(Lancamento.id)} > 
                        <i className="pi pi-pencil"></i>                            
                    </button>

                    <button type="button" className="btn btn-danger" 
                            title="Excluir"
                            onClick={e => props.deleteAction(Lancamento)} > 
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })


    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col"> Descrição</th>
                    <th scope="col"> Valor</th>
                    <th scope="col"> Tipo</th>
                    <th scope="col"> Mês</th>
                    <th scope="col"> Situação</th>
                    <th scope="col"> Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}