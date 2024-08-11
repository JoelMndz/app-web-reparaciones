import {create, } from "zustand";
import axiosAPI from "../utils/axios";

interface IState{
  reparaciones: IReparacion[]
  mostrarFormulario: boolean
}

interface IActions{
  obtenerReparaciones: () => Promise<void>,
  crearReparacion: (reparacion:IReparacionAgregar) => Promise<void>,
  finalizarReparacion:(reparacion:IReparacion) => Promise<void>,
  abrirFormulario: () => void,
  cerrarFormulario: ()=> void,
}

const API_REPARACION = "/api/reparacion"

export const useReparacionStore = create<IState & IActions>(
  (set, get)=>({
    reparaciones: [],
    mostrarFormulario: false,
    async obtenerReparaciones(){
      const respuesta = await axiosAPI.get(API_REPARACION)
      set({reparaciones: respuesta.data})
    },
    async crearReparacion(reparacion){
      await axiosAPI.post(API_REPARACION, reparacion)
      get().cerrarFormulario()
      get().obtenerReparaciones()     
    },
    async finalizarReparacion(reparacion){
      const respuesta = window.confirm((`Seguro de finalizar la reparacion del cliente "${reparacion.cliente}"?`))
      if (respuesta) {
        await axiosAPI.put(`${API_REPARACION}/${reparacion.id}`)
        get().obtenerReparaciones()
      }
    },
    abrirFormulario(){
      set({mostrarFormulario: true})
    },
    cerrarFormulario(){
      set({mostrarFormulario: false})
    }
  })
)

interface IReparacion{
  id: number
  fechaRegistro: string
  fechaEntrega: string
  idCliente: number
  cliente: string
  estado: string
  detalles: IReparacionDetalle[]
}

interface IReparacionDetalle{
  id: number
  descripcion: string
  precio: string
}

interface IReparacionAgregar{
  fechaEntrega: string
  idCliente: number
  idTecnico: number
  detalles: {
    descripcion: string
    precio: number
  }[]
}