export interface Taxi {
    _id: string;
    matricula: string;
    anoDeCompra: Date;
    marca: string;
    modelo: string;
    conforto: string;
}

const TaxiSchema = new Schema({
    matricula: { type: String, minLength: 2, maxLength: 12, unique: true, required: true },
    anoDeCompra: { type: Date, min: '1900', required: true },
    marca: { type: String, minLength: 2, maxLength: 32, required: true },
    modelo: { type: String, minLength: 2, maxLength: 32, required: true },
    conforto: {
        type: String,
        required: true,
        enum: ["basico", "luxuoso"],
        default: "basico"
    },
});

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