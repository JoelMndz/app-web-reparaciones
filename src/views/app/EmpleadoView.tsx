import React, { useEffect } from "react";
import { useEmpleadoStore } from "../../stores";
import TablaEmpleados from "../../components/TablaEmpleado";
import { Col, Modal } from "react-bootstrap";
import FormEmpleado from "../../components/FormEmpleado";

function EmpleadoView() {

  const {obtenerEmpleados, obtenerRoles, mostrarFormulario} = useEmpleadoStore()


  useEffect(()=>{
    obtenerEmpleados()
    obtenerRoles()
  }, [])

  return <div className="w-100 mt-5">
    <Col>
      <TablaEmpleados />
    </Col>
    <Modal
      show={mostrarFormulario}
    >
      <FormEmpleado/>
    </Modal>
  </div>;
}

export default EmpleadoView;
