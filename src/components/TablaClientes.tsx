import React from "react";
import { Button, Table } from "react-bootstrap";
import { useClienteStore } from "../stores";

function TablaClientes() {

  const {clientes, abrirFormulario, eliminarCliente} = useClienteStore()

  return <>
    <Button 
      className="my-3"
      onClick={() => abrirFormulario()}
    >Agregar</Button>
    <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Telefono</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {clientes.map(x => <tr key={x.id}>
        <td>{x.nombre}</td>
        <td>{x.email}</td>
        <td>{x.telefono}</td>
        <td>
          <span 
            onClick={()=> abrirFormulario(x)}
            style={{marginRight:15, cursor:'pointer'}}>
            ✏
          </span>
          <span 
            onClick={()=> eliminarCliente(x)}
            style={{marginRight:15, cursor:'pointer'}}>
            ❌
          </span>
        </td>
      </tr>)}
    </tbody>
  </Table>
  </>
}

export default TablaClientes;
