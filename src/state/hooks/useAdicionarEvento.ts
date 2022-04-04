import { IEvento } from "../../interfaces/IEvento"
import { listaDeEventosState } from "../atom"
import {useSetRecoilState} from "recoil";
import {obterId} from "../../util";

const useAdicionarEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)
  return (evento: IEvento) => {
    const hoje = new Date();
    if (evento.inicio < hoje) {
      throw new Error("A data do evento não pode ser anterior a atual");
    }
    evento.id = obterId();
    return setListaDeEventos(listaAntiga => [...listaAntiga, evento]);
  }
}

export default useAdicionarEvento;