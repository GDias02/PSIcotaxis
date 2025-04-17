import { Cliente, CLIENTES } from "./mock-clientes";
import { Morada, MORADAS_VIAGENS, MoradaSchema } from "./mock-morada";
import { Motorista, MOTORISTAS } from "./mock-motoristas";
import { Taxi, TAXIS } from "./mock-taxis";

export interface Viagem {
    _id: string;
    motorista: Motorista;
    taxi: Taxi;
    cliente: {cliente: Cliente, passageiros: number}
    dataPartida: Date;
    localPartida: Morada;
    dataChegada: Date;
    localChegada: Morada;
    custoTotal: number;
}

const ViagemSchema = new Schema({
    //TO_DO - SPRINT 2
});

export const VIAGENS: Viagem[] = [{
    //TO_DO - SPRINT 2
    _id: '1',
    motorista: MOTORISTAS[0],
    taxi: TAXIS[0],
    cliente: {cliente: CLIENTES[0], passageiros: 0},
    dataPartida: DATAS_VIAGENS[0],
    localPartida: MORADAS_VIAGENS[0],
    dataChegada: DATAS_VIAGENS[1],
    localChegada: MORADAS_VIAGENS[1],
    custoTotal: 0,
}
];