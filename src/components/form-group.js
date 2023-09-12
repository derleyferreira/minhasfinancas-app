import React from 'react'

function FormGroup(props){
    return(
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">{props.Label}</label>
            {props.children}
      </div>        
    )
}

export default FormGroup