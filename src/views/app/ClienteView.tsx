import React, { useEffect } from "react";
import TablaClientes from "../../components/TablaClientes";
import { Button, Col, Modal } from "react-bootstrap";
import { useClienteStore } from "../../stores";
import FormCliente from "../../components/FormCliente";

function ClienteView() {

  const {obtenerClientes, mostrarFormulario} = useClienteStore()

  useEffect(()=>{
    obtenerClientes()
  }, [])


  return <div className="w-100 mt-5">
    <Col>
      <TablaClientes />
    </Col>
    <Modal
      show={mostrarFormulario}
    >
      <FormCliente/>
    </Modal>
  </div>;
}

export default ClienteView;
