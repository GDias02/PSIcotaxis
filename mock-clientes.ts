export interface Cliente {
    _id: string;
    nif: number;
    nome: string;
    genero: string;
}

const ClienteSchema = new Schema({
    nif: { type: Number, min: 100000000, max: 999999999, unique: true, required: true },
    nome: { type: String, minLength: 2, maxLength: 64, required: true },
    genero: {
        type: String,
        required: true,
        enum: ["feminino", "masculino"],
        default: "feminino"
    },
});

export const CLIENTES: Cliente[] = [
    {
        _id: '9',
        nif: 999999999,
        nome: 'Zélia Zacarias',
        genero: 'feminino',
    },
    {
        _id: '8',
        nif: 888888888,
        nome: 'Ximenes Xavier',
        genero: 'masculino',
    },
    {
        _id: '7',
        nif: 777777777,
        nome: 'Vasco Variacoes',
        genero: 'masculino',
    },
];