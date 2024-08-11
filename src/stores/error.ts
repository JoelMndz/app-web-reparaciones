import { AxiosError } from "axios";
import {create} from "zustand";

interface IState{
  mensaje: string | null
}

interface IActions{
  resetearError: () => void,
  manejarError:(error:any) => void
}

export const useErrorStore = create<IState & IActions>((set) => ({
  mensaje: null,
  resetearError(){
    set({mensaje:null})
  },
  manejarError(error:any){
    let errorPersonalizado:string | null =  null;
    if(error instanceof AxiosError){
      errorPersonalizado = error.response?.data?.mensaje
    }
    set({mensaje: errorPersonalizado ?? 'Error, comuniquese con sistemas'})
  }
}))
