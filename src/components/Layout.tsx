import { Container } from "react-bootstrap";
import BarraNavegacion from "./BarraNavegacion";
import { Outlet } from "react-router-dom";

function Layout() {
  
  return <>
    <BarraNavegacion/>
    <Container 
      style={{display:'flex', height:'80vh', justifyContent:'center'}}>
      <Outlet/>
    </Container>
  </>;
}

export default Layout;
