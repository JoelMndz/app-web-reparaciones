import React, { useEffect, useState } from "react";
import { Button, Card, CloseButton, Form, Modal, Spinner } from "react-bootstrap";
import ErrorAlert from "./ErrorAlert";
import { useClienteStore, useErrorStore } from "../stores";

function FormCliente() {
  const [cargando, setCargando] = useState(false);
  const {agregarCliente, actualizarCliente, cerrarFormulario, clienteActual} = useClienteStore()
  const errorStore = useErrorStore()
  const [campos, setCampos] = useState({
    nombre: '',
    email:'',
    telefono: ''
  });

  const procesarFormulario = async(e:any)=>{
    try {
      e.preventDefault()
      setCargando(true)
      clienteActual ? 
      await actualizarCliente(campos):
      await agregarCliente(campos)
    } catch (error:any) {
      errorStore.manejarError(error)
    }finally{
      setCargando(false)
    }
  }

  useEffect(()=>{
    if(clienteActual){
      setCampos({...clienteActual})
    }
  },[])

  return <Card>
    <Modal.Header>
      <Modal.Title>{clienteActual ? 'Editar':'Agregar'} cliente</Modal.Title>
      <CloseButton 
        onClick={()=> cerrarFormulario()}/>
    </Modal.Header>   
    <Card.Body>
      <Form
        onSubmit={procesarFormulario}
      >
        <ErrorAlert/>
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Nombre"
          onChange={x => setCampos({...campos, nombre: x.target.value})}
          value={campos.nombre}
          required
        />
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Telefono"
          onChange={x => setCampos({...campos, telefono: x.target.value})}
          value={campos.telefono}
          required
        />
        <Form.Control
          className="mb-3"
          type="email"
          placeholder="Email"
          onChange={x => setCampos({...campos, email: x.target.value})}
          value={campos.email}
          required
        />
        <Button 
          type="submit" 
          className="w-100" 
        >
          {cargando ? 
            (<Spinner size="sm" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>) :
            'Guardar'}
        </Button>
        
      </Form>
    </Card.Body>
  </Card>
  
}

export default FormCliente;
