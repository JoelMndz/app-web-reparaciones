import {create, } from "zustand";
import axiosAPI from "../utils/axios";

interface IState{
  roles: IRol[]
  empleados: IEmpleado[]
  mostrarFormulario: boolean
}

interface IActions{
  obtenerRoles: () => Promise<void>,
  obtenerEmpleados: () => Promise<void>,
  agregarEmpleado: (body:IEmpleadoAgregar) => Promise<void>,
  abrirFormulario: () => void,
  cerrarFormulario:()=> void,
}

const API_EMPLEADO = "/api/usuario"
const API_ROL = "/api/rol"

export const useEmpleadoStore = create<IState & IActions>(
  (set, get) => ({
    roles: [],
    empleados: [],
    mostrarFormulario: false,
    async obtenerRoles(){
      const respuesta = await axiosAPI.get(API_ROL)
      set({roles: respuesta.data})      
    },
    async obtenerEmpleados(){
      const respuesta = await axiosAPI.get(API_EMPLEADO)
      set({empleados: respuesta.data})      
    },
    async agregarEmpleado(body) {
      const respuesta = await axiosAPI.post(API_EMPLEADO, body)
      set({empleados: [respuesta.data, ...(get().empleados)]})  
      set({mostrarFormulario: false})
    },
    abrirFormulario(){
      set({mostrarFormulario: true,})
    },
    cerrarFormulario(){
      set({mostrarFormulario: false})
    }
  })
)

interface IEmpleado{
  id:       number
  nombre:   string
  telefono: string
  email:    string
  idRol:    number
  rol:      string
}

interface IRol{
  id:       number
  nombre:   string
}

interface IEmpleadoAgregar{
  nombre:   string
  telefono: string
  email:    string
  idRol:    number
}