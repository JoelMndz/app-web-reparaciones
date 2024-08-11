import React, { useEffect } from "react";
import { Col, Modal } from "react-bootstrap";
import TablaReparaciones from "../../components/TablaReparaciones";
import { useClienteStore, useReparacionStore } from "../../stores";
import FormReparacion from "../../components/FormReparacion";

function ReparacionView() {
  const {obtenerReparaciones, mostrarFormulario} = useReparacionStore()
  const {obtenerClientes} = useClienteStore()

  useEffect(()=>{
    obtenerClientes()
    obtenerReparaciones()
  },[])

  return <div className="w-100 mt-5">
    <Col>
      <TablaReparaciones />
    </Col>
    <Modal
      size="lg"
      show={mostrarFormulario}
    >
      <FormReparacion />
    </Modal>
  </div>;
}

export default ReparacionView;
