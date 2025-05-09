import { Cliente } from './cliente';
import { Morada } from './morada';
import { Motorista } from './motorista';
import { Taxi } from './taxi';

export interface Pedido {
    _id: string;
    moradaDe: Morada;
    moradaPara: Morada;
    numDePassageiros: number;
    luxuoso: boolean;
    cliente: Cliente["_id"];
    motorista: Motorista["_id"];
    taxi: Taxi["_id"];
    coordenadasDe: string;
    coordenadasPara: string;
    status: string;
}