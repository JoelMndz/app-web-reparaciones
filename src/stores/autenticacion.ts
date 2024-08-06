import {create} from "zustand";

interface IState{
  usuario: any,
  jwt: string | null
}

export const useAutenticacionStore = create<IState>(() => ({
  usuario: null,
  jwt: null
}))
