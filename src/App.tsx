import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LoginView from './views/autenticacion/LoginView'

function App() {
  
  return <BrowserRouter>
    <Routes>
      
      <Route path='/'>
        <Route index element={<LoginView/>}/>
      </Route>
       
    </Routes>
  </BrowserRouter>
}

export default App
