import { useState } from "react";
import {Button, Card, Container, Form, Spinner} from "react-bootstrap";
import { useAutenticacionStore, useErrorStore } from "../../stores";
import ErrorAlert from "../../components/ErrorAlert";
import { useNavigate, useNavigation } from "react-router-dom";
import Layout from "../../components/Layout";


function LoginView() {
    const [cargando, setCargando] = useState(false);
    const {login} = useAutenticacionStore()
    const errorStore = useErrorStore()
    const [campos, setCampos] = useState({
      email:'',
      password: ''
    });
    const navegacion = useNavigate()

    const procesarFormulario = async(e:any)=>{
      try {
        e.preventDefault()
        setCargando(true)
        await login(campos)
        navegacion('/app')
      } catch (error:any) {
        errorStore.manejarError(error)
      }finally{
        setCargando(false)
      }
    }

  return <Container style={{display:'flex', height:'80vh', alignItems:'center', justifyContent:'center'}}>
    <Card className="py-4" style={{width:450}}>
      <Card.Title className="text-center">
        <h3>Inciar sesión</h3>
      </Card.Title>
      <Card.Body>
        <Form
          onSubmit={procesarFormulario}
        >
          <ErrorAlert/>
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
          >
            {cargando ? 
              (<Spinner size="sm" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>) :
              'Ingresar'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </Container>;
}

export default LoginView;