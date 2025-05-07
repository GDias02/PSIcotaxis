import { Morada } from './morada';

export interface Pedido {
    _id: string;
    moradaDe: Morada;
    moradaPara: Morada;
    numDePassageiros: number;
    luxuoso: boolean;
    nif: string;
    genero: string;
    nome: string;
    coordenadasDe: string;
    coordenadasPara: string;
    status: string;
}