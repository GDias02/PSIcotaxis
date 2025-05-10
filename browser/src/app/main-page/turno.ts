import { Taxi } from "./taxi";

export interface Turno {
    _id: string;
    motorista: string;
    taxi: string;
    viagens: string[];
    inicio: Date;
    fim: Date;
}

export interface TurnoCompleto {
    _id: string;
    motorista: string;
    taxi: Taxi;
    viagens: string[];
    inicio: Date;
    fim: Date;
}