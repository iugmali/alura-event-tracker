import {selector} from "recoil";
import {filtroDeEventos, listaDeEventosState} from "../atom";
import {IEvento} from "../../interfaces/IEvento";

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(filtroDeEventos)
    const todosOsEventos = get(listaDeEventosState)
    return todosOsEventos.filter(evento => {
      if (!filtro.date) {
        return true
      }
      const ehOMesmoDia = filtro.date.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10)
      return ehOMesmoDia
    })
  }
});

export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const respostaHttp = await fetch('http://localhost:8080/eventos')
    const eventosJson: IEvento[] = await respostaHttp.json()
    return eventosJson.map(evento => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim)
    }))
  }
})