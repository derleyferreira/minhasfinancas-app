import React from 'react'
import 'bootswatch/dist/flatly/bootstrap.css'
import Login from '../views/login'
import '../custom.css'
import CadastroUsuario from '../views/cadastroUsuario';
import Rotas from './rotas';
import Navbar from '../components/navbar'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import "primereact/resources/themes/lara-light-indigo/theme.css";   
import "primeicons/primeicons.css"
    
//core
import "primereact/resources/primereact.min.css"; 

class App extends React.Component{

    render(){
      return (
        <>
          <Navbar/>
          <div className='container'>
              <Rotas/>
          </div>
        </>
     );      
    }

}

export default App