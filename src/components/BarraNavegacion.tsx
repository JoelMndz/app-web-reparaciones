import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAutenticacionStore } from "../stores";

function BarraNavegacion() {
  const navegacion = useNavigate()
  const {salir, usuario} = useAutenticacionStore()
  
  const cerrarSesion = ()=>{
    salir()
    navegacion('/')
  }

  return <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand onClick={()=> navegacion('/app')}>Tienda celulares</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=> navegacion('/app/clientes')}>Clientes</Nav.Link>
          {usuario?.rol == "Administrador" ? <Nav.Link onClick={()=> navegacion('/app/empleados')}>Empleados</Nav.Link> : null}
          <Nav.Link onClick={()=> navegacion('/app/reparaciones')}>Reparaciones</Nav.Link>
        </Nav>
        <Button
          onClick={()=> cerrarSesion()}
          variant="danger"
        >Salir</Button>
      </Container>
      </Navbar>
  </>
}

export default BarraNavegacion;
