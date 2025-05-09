import { Morada } from "./morada";

export interface Viagem {
    _id?: string,
    seq: number,
    motorista: string,
    taxi: string,
    cliente: string,
    numeroDePassageiros: number,
    partida: Morada,
    chegada?: Morada,
    inicio: Date,
    fim?: Date,
    kilometros?: number,
    custo?: number
}