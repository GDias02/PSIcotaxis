const Config = require("../models/config");
const Taxi = require("../models/taxi");
const Motorista = require("../models/motorista");

const asyncHandler = require("express-async-handler");

exports.init = asyncHandler(async (req, res) => {
  const configs = [];
  const taxis = [];
  const motoristas = [];
    
  main().catch((err) => console.log(err));
    
  async function main() {
    await Motorista.deleteMany({});
    //await Taxi.deleteMany({});
    //await Config.deleteMany();

    //await createConfigs();
    //await createTaxis();
    await createMotoristas();

    res.status(200).send();
  }

  async function configCreate(index, configJson) {
    const config = new Config(configJson);
    await config.save();
    configs[index] = config;
  }
  
  async function taxiCreate(index, taxiJson) {
    const taxi = new Taxi(taxiJson);
    await taxi.save();
    taxis[index] = taxi;
  }
  
  async function motoristaCreate(index, motoristaJson) {
    const motorista = new Motorista(motoristaJson);
    await motorista.save();
    motoristas[index] = motorista;
  }
    
  async function createConfigs() {
    await Promise.all([
      configCreate(0, CONFIGS[0]),
    ]);
  }
  
  async function createTaxis() {
    await Promise.all([
      taxiCreate(0, TAXIS[0]),
      taxiCreate(1, TAXIS[1]),
      taxiCreate(2, TAXIS[2]),
    ]);
  }

  async function createMotoristas() {
    await Promise.all([
      motoristaCreate(0, MOTORISTAS[0]),
      motoristaCreate(1, MOTORISTAS[1]),
      motoristaCreate(2, MOTORISTAS[2]),
    ]);
  }
});

const CONFIGS = [
    {
        ppm_basico: 10,
        ppm_luxuoso: 10,
        agravamento: 10,
    }
]

const TAXIS = [
    {
        matricula: '11-AA-11',
        anoDeCompra: new Date('2001'),
        marca: 'Audi',
        modelo: 'A1',
        conforto: 'basico',
    },
    {
        matricula: '22-BB-22',
        anoDeCompra: new Date('2002'),
        marca: 'Bentley',
        modelo: 'Bentayga',
        conforto: 'luxuoso',
    },
    {
        matricula: '33-CC-33',
        anoDeCompra: new Date('2003'),
        marca: 'Citroën',
        modelo: 'C3',
        conforto: 'basico',
    },
];

const MORADAS_MOTORISTAS = [
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

const MOTORISTAS = [
    {
        nif: 111111111,
        nome: 'Ana Artemisa Alexandre',
        genero: 'feminino',
        anoDeNascimento: new Date('1991'),
        cartaDeConducao: 'L-1111111',
        morada: MORADAS_MOTORISTAS[0],
    },
    {
        nif: 222222222,
        nome: 'Beto Baltazar Botelho',
        genero: 'masculino',
        anoDeNascimento: new Date('1992'),
        cartaDeConducao: 'L-2222222',
        morada: MORADAS_MOTORISTAS[1],
    },
    {
        nif: 333333333,
        nome: 'Carlos Carvalho',
        genero: 'masculino',
        anoDeNascimento: new Date('1993'),
        cartaDeConducao: 'L-3333333',
        morada: MORADAS_MOTORISTAS[2],
    },
];