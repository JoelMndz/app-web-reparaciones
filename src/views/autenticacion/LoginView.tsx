import { useState } from "react";
import {Button, Card, Form} from "react-bootstrap";

function LoginView() {
  const [campos, setCampos] = useState({
    email:'',
    password: ''
  });
  

  const procesarFormulario = (e:any)=>{
    e.preventDefault()

  }

  return <div className="container mt-5">
    <Card>
      <Card.Title className="text-center">
        <h3>Inciar sesión</h3>
      </Card.Title>
      <Card.Body>
        <Form
          onSubmit={procesarFormulario}
        >
          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Email"
            onChange={x => setCampos({...campos, email: x.target.value})}
            value={campos.email}
            required
          />
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Contraseña"
            onChange={x => setCampos({...campos, password: x.target.value})}
            value={campos.password}
            required
          />
          <Button 
            type="submit" 
            className="w-100" 
            // disabled={!campos.email || !campos.password}
          >
            Ingresar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>;
}

export default LoginView;