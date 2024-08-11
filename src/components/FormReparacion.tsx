import React, { useState } from "react";
import { useAutenticacionStore, useClienteStore, useErrorStore, useReparacionStore } from "../stores";
import ErrorAlert from "./ErrorAlert";
import { Card, Modal, Form, CloseButton, Spinner, Button, Row, Col, ListGroup, Badge } from "react-bootstrap";

function FormReparacion() {
  interface ICampos{
    fechaEntrega: string
    idCliente: number | null
    detalles:{descripcion: string, precio: number}[]
  }

  const [cargando, setCargando] = useState(false);
  const errorStore = useErrorStore()
  const {usuario} = useAutenticacionStore()
  const {clientes} = useClienteStore()
  const {crearReparacion, cerrarFormulario} = useReparacionStore()
  const [campos, setCampos] = useState<ICampos>({
    idCliente: null,
    fechaEntrega: '',
    detalles: []  
  });     
  const [detalle, setDetalle] = useState<{descripcion:string, precio:number | null}>({
    descripcion: '',
    precio: null
  });
  

  const procesarFormulario = async(e:any)=>{
    try {
      e.preventDefault()
      setCargando(true)
      await crearReparacion({...campos, idCliente: campos.idCliente!, idTecnico: usuario!.id})
    } catch (error:any) {
      errorStore.manejarError(error)
    }finally{
      setCargando(false)
    }
  }

  return <Card>
    <Modal.Header>
      <Modal.Title>Agregar reparacion</Modal.Title>
      <CloseButton 
        onClick={()=> cerrarFormulario()}/>
    </Modal.Header>   
    <Card.Body>
      <Form
        onSubmit={procesarFormulario}
      >
        <ErrorAlert/>
        <Row>
          <Col xs="12" sm="6">
            <Form.Select 
              className="mb-3"
              onChange={x => setCampos({...campos, idCliente: parseInt(x.target.value) ?? null})}
              required>
              <option>Selecciona un cliente</option>
              {clientes.map(x => 
                <option key={x.id} value={x.id}>{x.nombre}</option>
              )}
            </Form.Select>
          </Col>
          <Col xs="12" sm="6">
            <Form.Control
              className="mb-3"
              type="datetime-local"
              placeholder="Fecha de entrega"
              onChange={x => setCampos({...campos, fechaEntrega: x.target.value})}
              value={campos.fechaEntrega}
              required
            />
          </Col>
        </Row>
        <Card className="mb-4">
          <Card.Title>Agregar Detalle</Card.Title>
          <Card.Body>
            <Row>
              <Col sm="6">
              <Form.Control
                className="mb-3"
                placeholder="Precio"
                onChange={x => setDetalle({...detalle, precio: parseFloat(x.target.value)})}
                value={detalle.precio ?? ''}
              />
              </Col>
              <Col>
              <Button 
                type="submit" 
                className="w-100" 
                disabled={!detalle.descripcion || !detalle.precio}
                onClick={()=>{
                  setCampos({
                    ...campos, 
                    detalles:[
                      ...campos.detalles, 
                      {descripcion:detalle.descripcion, precio: detalle.precio!}
                    ]})
                  setDetalle({descripcion:'',precio:null})
                }}
              >Agregar</Button>
              </Col>
            </Row>
            <Form.Control
              className="mb-3"
              placeholder="Descripción"
              onChange={x => setDetalle({...detalle, descripcion: x.target.value})}
              value={detalle.descripcion}
            />
            <ListGroup as="ol" numbered>
              {campos.detalles.map((x,i) => <ListGroup.Item
                key={i}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">$ {x.precio}</div>
                  {x.descripcion}
                </div>
              </ListGroup.Item>)}
            </ListGroup>
          </Card.Body>
        </Card>
        <Button 
          type="submit" 
          className="w-100" 
          disabled={!campos.detalles.length || !campos.idCliente || !campos.fechaEntrega}
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

export default FormReparacion;
