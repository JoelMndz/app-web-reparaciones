import React from "react";
import { Button, Table } from "react-bootstrap";
import { useClienteStore, useEmpleadoStore } from "../stores";

function TablaEmpleados() {

  const {empleados, abrirFormulario} = useEmpleadoStore()

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
        <th>Rol</th>
      </tr>
    </thead>
    <tbody>
      {empleados.map(x => <tr key={x.id}>
        <td>{x.nombre}</td>
        <td>{x.email}</td>
        <td>{x.telefono}</td>
        <td>{x.rol}</td>
      </tr>)}
    </tbody>
  </Table>
  </>
}

export default TablaEmpleados;
