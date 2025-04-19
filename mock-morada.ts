export interface Morada {
    rua: string;
    numeroDePorta: string;
    codigoPostal: string;
    localidade: string;    
}

export const MoradaSchema = new Schema({
    rua: { type: String, minLength: 2, maxLength: 64, required: true },
    numeroDePorta: { type: String, minLength: 2, maxLength: 16, required: true },
    codigoPostal: { type: String, minLength: 8, maxLength: 8, required: true },
    localidade: { type: String, minLength: 2, maxLength: 32, required: true}
});

export const MORADAS_MOTORISTAS: Morada[] = [
    {   //Avenida
        rua: 'Av. da Liberdade',
        numeroDePorta: '182',
        codigoPostal: '1250-146',
        localidade: 'Lisboa',
    },
    {   //Beco
        rua: 'Beco das Farinhas',
        numeroDePorta: '10',
        codigoPostal: '1100-179',
        localidade: 'Lisboa',
    },
    {   //Calçada
        rua: 'Calçada do Carmo',
        numeroDePorta: '37 A',
        codigoPostal: '1200-090',
        localidade: 'Lisboa',
    },
];

export const MORADAS_VIAGENS: Morada[] = [
    {   //TO_DO - SPRINT2
        rua: '',
        numeroDePorta: '',
        codigoPostal: '',
        localidade: '',
    },
];