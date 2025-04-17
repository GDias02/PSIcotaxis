import { Morada, MORADAS_MOTORISTAS, MoradaSchema } from "./mock-morada";

export interface Motorista {
    _id: string;
    nif: number;
    nome: string;
    genero: string;
    anoDeNascimento: Date;
    cartaDeConducao: string;
    morada: Morada; //Aqui a morada deverá ser apenas uma string, correspondente ao id da morada na collection de moradas.
}

const MotoristaSchema = new Schema({
    nif: { type: Number, min: 100000000, max: 999999999, unique: true, required: true },
    nome: { type: String, minLength: 2, maxLength: 64, required: true },
    genero: {
        type: String,
        required: true,
        enum: ["feminino", "masculino"],
        default: "feminino"
    },
    anoDeNascimento: { type: Date, min: '1900', required: true },
    cartaDeConducao: { type: String, minLength: 2, maxLength: 32, unique: true, required: true },
    morada: { MoradaSchema, required: true } //ACRESCENTAR REQUIRED:TRUE
});

export const MOTORISTAS: Motorista[] = [
    {
        _id: '1',
        nif: 111111111,
        nome: 'Ana Artemisa Alexandre',
        genero: 'feminino',
        anoDeNascimento: new Date('1991'),
        cartaDeConducao: 'L-1111111',
        morada: MORADAS_MOTORISTAS[0],
    },
    {
        _id: '2',
        nif: 222222222,
        nome: 'Beto Baltazar Botelho',
        genero: 'masculino',
        anoDeNascimento: new Date('1992'),
        cartaDeConducao: 'L-2222222',
        morada: MORADAS_MOTORISTAS[1],
    },
    {
        _id: '3',
        nif: 333333333,
        nome: 'Carlos Carvalho',
        genero: 'masculino',
        anoDeNascimento: new Date('1993'),
        cartaDeConducao: 'L-3333333',
        morada: MORADAS_MOTORISTAS[2],
    },
];