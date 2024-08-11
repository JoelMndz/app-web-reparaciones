import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LoginView from './views/autenticacion/LoginView'
import { useAutenticacionStore } from './stores'
import Layout from './components/Layout'
import ClienteView from './views/app/ClienteView'
import EmpleadoView from './views/app/EmpleadoView'
import ReparacionView from './views/app/ReparacionView'

function App() {
  const {usuario} = useAutenticacionStore()

  return <BrowserRouter>
    <Routes>
      
      <Route path='/'>
        <Route index element={usuario ? <Navigate to="/app" replace/> : <LoginView/>}/>
      </Route>
       
      <Route
        path='/app'
        element={usuario ? <Layout/> : <Navigate to='/' replace />}>
        <Route index element={<Navigate to="/app/clientes"/>}/>
        <Route path='clientes' element={<ClienteView/>}/>
        <Route path="empleados" element={<EmpleadoView/>}/>
        <Route path="reparaciones" element={<ReparacionView/>}/>

      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
