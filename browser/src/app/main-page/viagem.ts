export interface Viagem {
    _id: string;
    motorista: string,
    taxi: string,
    clientes: string[],
    partida: string,
    chegada?: string,
    inicio: Date,
    fim?: Date,
}