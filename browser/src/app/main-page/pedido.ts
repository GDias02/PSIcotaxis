import { Cliente } from './cliente';
import { Morada } from './morada';

export interface Pedido {
    _id: string;
    moradaDe: Morada;
    moradaPara: Morada;
    numDePassageiros: number;
    luxuoso: boolean;
    cliente: Cliente["_id"];
    coordenadasDe: string;
    coordenadasPara: string;
    status: string;
}