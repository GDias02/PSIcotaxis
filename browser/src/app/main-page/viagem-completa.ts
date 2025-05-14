import { Morada } from "./morada";
import { Motorista } from "./motorista";
import { Taxi } from "./taxi";

export interface ViagemCompleta {
    _id?: string,
    seq: number,
    motorista: Motorista,
    taxi: Taxi,
    cliente: string,
    numeroDePassageiros: number,
    partida: Morada,
    chegada?: Morada,
    inicio: Date,
    fim?: Date,
    kilometros?: number,
    custo?: number
}