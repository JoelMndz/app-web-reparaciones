import React from "react";
import { useReparacionStore } from "../stores";
import { Button, ListGroup, Table } from "react-bootstrap";

function TablaReparaciones() {
  const {reparaciones, abrirFormulario, finalizarReparacion} = useReparacionStore()

  const calcularTotal = (lista: {precio:number}[])=>{
    return lista.reduce((a,b) => a+b.precio,0)
  }


  return <>
    <Button 
      className="my-3"
      onClick={() => abrirFormulario()}
    >Agregar</Button>
    <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Fecha de entrega</th>
        <th>Cliente</th>
        <th>Estado</th>
        <th>Total</th>
        <th>Detalles</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {reparaciones.map(x => <tr key={x.id}>
        <td>{new Date(x.fechaEntrega).toLocaleString()}</td>
        <td>{x.cliente}</td>
        <td>{x.estado.toLocaleLowerCase()}</td>
        <td>{calcularTotal(x.detalles as any)}</td>
        <td>{x.detalles.map(x => 
          <ListGroup key={x.id}>
            <ListGroup.Item>${x.precio} {x.descripcion}</ListGroup.Item>
          </ListGroup>          
        )}</td>
        <td>
          {x.estado == 'PENDIENTE' ? <span
            title="Finalizado"
            onClick={()=> finalizarReparacion(x)}
            style={{marginRight:15, cursor:'pointer'}}>
            ✅
          </span> : null}
        </td>
      </tr>)}
    </tbody>
  </Table>
</>
}

export default TablaReparaciones;
