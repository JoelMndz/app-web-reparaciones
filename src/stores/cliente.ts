import {create, } from "zustand";
import axiosAPI from "../utils/axios";

interface IState{
  clientes: ICliente[]
  clienteActual: ICliente | null
  mostrarFormulario: boolean
}

interface IActions{
  obtenerClientes: () => Promise<void>,
  agregarCliente: (body:IClienteAgregar) => Promise<void>,
  abrirFormulario: (cliente?:ICliente) => void,
  cerrarFormulario:()=> void,
  actualizarCliente: (body:IClienteAgregar) => Promise<void>,
  eliminarCliente: (cliente:ICliente) => Promise<void>,
}

const API_CLIENTE = "/api/cliente"

export const useClienteStore = create<IState & IActions>(
  (set, get) => ({
    clientes: [],
    clienteActual: null,
    mostrarFormulario: false,
    async obtenerClientes(){
      const respuesta = await axiosAPI.get(API_CLIENTE)
      set({clientes: respuesta.data})      
    },
    async agregarCliente(body) {
      const respuesta = await axiosAPI.post(API_CLIENTE, body)
      set({clientes: [respuesta.data, ...(get().clientes)]})  
      set({mostrarFormulario: false})
    },
    async eliminarCliente(cliente){
      const respuesta = window.confirm((`Seguro de eliminar el cliente "${cliente.nombre}"?`))
      if (respuesta) {
        await axiosAPI.delete(`${API_CLIENTE}/${cliente.id}`)
        set({clientes: get().clientes.filter(x => x.id != cliente.id)})
      }
    },
    async actualizarCliente(body){
      const respuesta = await axiosAPI.patch(API_CLIENTE, body)
      set({clientes: (get().clientes.map(x => x.id == get().clienteActual?.id ? respuesta.data : x))})  
      set({mostrarFormulario: false, clienteActual: null})
    },
    abrirFormulario(cliente){
      set({mostrarFormulario: true, clienteActual: cliente ?? null})
    },
    cerrarFormulario(){
      set({mostrarFormulario: false, clienteActual: null})
    }
  })
)

interface ICliente{
  id:       number
  nombre:   string
  telefono: string
  email:    string
}

interface IClienteAgregar{
  nombre:   string
  telefono: string
  email:    string
}