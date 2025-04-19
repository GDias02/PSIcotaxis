export interface Taxi {
    _id: string;
    matricula: string;
    anoDeCompra: number;
    marca: string;
    modelo: string;
    conforto: 'básico' | 'luxuoso';
  }
  
  // Mock de táxis realistas com dados compatíveis com o backend
  export const TAXIS: Taxi[] = [
    {
      _id: '1',
      matricula: '11-AA-11',
      anoDeCompra: 2020,
      marca: 'Toyota',
      modelo: 'Corolla',
      conforto: 'básico',
    },
    {
      _id: '2',
      matricula: '22-BB-22',
      anoDeCompra: 2022,
      marca: 'Renault',
      modelo: 'Clio',
      conforto: 'luxuoso',
    },
    {
      _id: '3',
      matricula: '33-CC-33',
      anoDeCompra: 2021,
      marca: 'BMW',
      modelo: 'Série 3',
      conforto: 'básico',
    },
  ];
  