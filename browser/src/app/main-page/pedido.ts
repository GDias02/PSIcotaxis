import { Cliente } from './cliente';
import { Morada } from './morada';

export interface Pedido {
    _id: string;
    motorista?: string;
    taxi?: string;
    moradaMotorista?: Morada;
    moradaDe: Morada;
    moradaPara: Morada;
    numDePassageiros: number;
    luxuoso: boolean;
    cliente: Cliente["_id"];
    coordenadasDe: string;
    coordenadasPara: string;
    status: string;
    custo?: number;
}