import { Taxi } from "./taxi";

export const TAXIS: Taxi[] = [
    {
        _id: '1',
        matricula: '11-AA-11',
        anoDeCompra: new Date('2001'),
        marca: 'Audi',
        modelo: 'A1',
        conforto: 'basico',
    },
    {
        _id: '2',
        matricula: '22-BB-22',
        anoDeCompra: new Date('2002'),
        marca: 'Bentley',
        modelo: 'Bentayga',
        conforto: 'luxuoso',
    },
    {
        _id: '3',
        matricula: '33-CC-33',
        anoDeCompra: new Date('2003'),
        marca: 'Citroën',
        modelo: 'C3',
        conforto: 'basico',
    },
];