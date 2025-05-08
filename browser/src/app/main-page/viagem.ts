export interface Viagem {
    _id: string;
    motorista: string,
    taxi: string,
    cliente: string,
    numeroDePassageiros: number,
    partida: string,
    chegada?: string,
    inicio: Date,
    fim?: Date,
}