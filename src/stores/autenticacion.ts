import {create, StateCreator} from "zustand";
import { persist } from "zustand/middleware"
import axiosAPI from "../utils/axios";

interface IState{
  usuario: IUsuario | null,
  jwt: string | null
}

interface IActions{
  login: (credenciales:{email:string, password:string}) => Promise<void>,
  salir: () => void
}

const API_AUTENTICACION = "/api/autenticacion/login"

export const useAutenticacionStore = create<IState & IActions>(
  persist(
    (set) => ({
      usuario: null,
      jwt: null,
      async login(credenciales:{email:string, password:string}){
        const respuesta = await axiosAPI.post(API_AUTENTICACION,credenciales)
        set({usuario: respuesta.data.usuario, jwt: respuesta.data.jwt})      
      },
      salir(){
        set({usuario: null, jwt: null})
      }
    }),
    {
      name: '@autenticacion',

    }
  ) as StateCreator<IState & IActions>
)


interface IUsuario{
  id:       number
  nombre:   string
  telefono: string
  email:    string
  idRol:    number
  rol:      string
}