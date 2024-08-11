import React, { useEffect, useState } from "react";
import { Button, Card, CloseButton, Form, Modal, Spinner } from "react-bootstrap";
import ErrorAlert from "./ErrorAlert";
import { useEmpleadoStore, useErrorStore } from "../stores";

interface ICampos{
  nombre: string
  telefono: string
  email: string
  idRol: number | null
}

function FormEmpleado() {
  const [cargando, setCargando] = useState(false);
  const {agregarEmpleado, cerrarFormulario, roles} = useEmpleadoStore()
  const errorStore = useErrorStore()
  const [campos, setCampos] = useState<ICampos>({
    nombre: '',
    email:'',
    telefono: '',
    idRol: null
  });

  const procesarFormulario = async(e:any)=>{
    try {
      e.preventDefault()
      setCargando(true)
      await agregarEmpleado({...campos, idRol: campos.idRol!})
    } catch (error:any) {
      errorStore.manejarError(error)
    }finally{
      setCargando(false)
    }
  }

  return <Card>
    <Modal.Header>
      <Modal.Title>Agregar empleado</Modal.Title>
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
        <Form.Select 
          className="mb-3"
          onChange={x => setCampos({...campos, idRol: parseInt(x.target.value) ?? null})}
          required>
          <option>Selecciona un rol</option>
          {roles.map(x => 
            <option key={x.id} value={x.id}>{x.nombre}</option>
          )}
        </Form.Select>
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

export default FormEmpleado;
