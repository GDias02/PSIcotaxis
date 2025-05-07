export interface Turno {
    _id: string;
    motorista: string;
    taxi: string;
    viagens: string[];
    inicio: Date;
    fim: Date;
}