const Config = require("../models/config");
const Taxi = require("../models/taxi");
const Pessoa = require("../models/pessoa");
const Motorista = require("../models/motorista");
const Cliente = require("../models/cliente");
const Gestor = require("../models/gestor");
const Turno = require("../models/turno");
const Pedido = require("../models/pedido");
const Viagem = require("../models/viagem");

const asyncHandler = require("express-async-handler");

exports.init = asyncHandler(async (req, res) => {
  const configs = [];
  const taxis = [];
  const motoristas = [];
  const clientes = [];
  const gestores = [];
  const turnos = [];
  const pedidos = [];
  const viagens = [];

  main().catch((err) => console.log(err));

  async function main() {
    await Pedido.deleteMany({});
    await Viagem.deleteMany({});
    await Pessoa.deleteMany({});
    await Taxi.deleteMany({});
    await Config.deleteMany();
    await Turno.deleteMany({});
    await Viagem.deleteMany({});

    await createConfigs();
    await createTaxis();
    await createMotoristas();
    await createClientes();
    await createGestores();
    await createTurnos();
    await createPedidos();
    await createViagens();

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

  async function motoristaCreate(index, motoristaJson, moradaJson) {
    const motorista = new Motorista(motoristaJson);
    motorista.morada = moradaJson
    await motorista.save();
    motoristas[index] = motorista;
  }

  async function clienteCreate(index, pessoaJson) {
    const pessoa = new Cliente(pessoaJson);
    await pessoa.save();
    clientes[index] = pessoa;
  }

  async function gestorCreate(index, pessoaJson) {
    const pessoa = new Gestor(pessoaJson);
    await pessoa.save();
    gestores[index] = pessoa;
  }

  async function turnoCreate(index, turnoJson, mi, ti) {
    const turno = new Turno(turnoJson);
    turno.motorista = motoristas[mi];
    turno.taxi = taxis[ti];
    await turno.save();
    turnos[index] = turno;
  }

  async function pedidoCreate(index, pedidoJson, ci) {
    const pedido = new Pedido(pedidoJson);
    pedido.cliente = clientes[ci];
    await pedido.save();
    pedidos[index] = pedido;
  }

  async function viagemCreate(index, viagemJson, mi, ti, ci, ) {
    const viagem = new Viagem(viagemJson);
    viagem.cliente = clientes[ci];
    viagem.taxi = taxis[ti];
    viagem.motorista = motoristas[mi];
    await viagem.save();
    viagens[index] = viagem;
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
      motoristaCreate(0, MOTORISTAS[0], MORADAS_MOTORISTAS[0]),
      motoristaCreate(1, MOTORISTAS[1], MORADAS_MOTORISTAS[1]),
      motoristaCreate(2, MOTORISTAS[2], MORADAS_MOTORISTAS[2]),
    ]);
  }

  async function createClientes() {
    await Promise.all([
      clienteCreate(0, CLIENTES[0]),
      clienteCreate(1, CLIENTES[1]),
      clienteCreate(2, CLIENTES[2]),
      clienteCreate(3, CLIENTES[3]),
    ]);
  }

  async function createGestores() {
    await Promise.all([
      gestorCreate(0, GESTORES[0])
    ]);
  }

  async function createTurnos() {
    await Promise.all([
      turnoCreate(0, TURNOS[0], 1, 0),
      turnoCreate(1, TURNOS[1], 1, 1),
      turnoCreate(2, TURNOS[2], 2, 2),
      turnoCreate(3, TURNOS[3], 0, 2)
    ]);
  }

  async function createPedidos() {
    await Promise.all([
      pedidoCreate(0, PEDIDOS[0], 0),
      pedidoCreate(1, PEDIDOS[1], 1),
      pedidoCreate(2, PEDIDOS[2], 2)
    ]);
  }

  async function createViagens() {
    await Promise.all([
      viagemCreate(0, VIAGENS[0], 0, 0, 0),
      viagemCreate(1, VIAGENS[1], 1, 1, 0),
      viagemCreate(2, VIAGENS[2], 1, 2, 0),
      viagemCreate(3, VIAGENS[1], 0, 0, 0),
      viagemCreate(4, VIAGENS[2], 2, 0, 0)
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
    matricula: 'AA-11-11',
    anoDeCompra: new Date('1991'),
    marca: 'Audi',
    modelo: 'A1',
    lugares: 5,
    conforto: 'basico',
  },
  {
    matricula: '22-22-BB',
    anoDeCompra: new Date('2002'),
    marca: 'Bentley',
    modelo: 'Bentayga',
    lugares: 4,
    conforto: 'luxuoso',
  },
  {
    matricula: '33-CC-33',
    anoDeCompra: new Date('2013'),
    marca: 'Citroën',
    modelo: 'C3',
    lugares: 7,
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
  },
  {
    nif: 222222222,
    nome: 'Beto Baltazar Botelho',
    genero: 'masculino',
    anoDeNascimento: new Date('1992'),
    cartaDeConducao: 'L-2222222',
  },
  {
    nif: 333333333,
    nome: 'Carlos Carvalho',
    genero: 'masculino',
    anoDeNascimento: new Date('1993'),
    cartaDeConducao: 'L-3333333',
  },
];

const CLIENTES = [
  {
    nif: 999999999,
    nome: 'Waldo Where',
    genero: 'masculino'
  },
  {
    nif: 888888888,
    nome: "Vitorina Veneza",
    genero: 'feminino'
  },
  {
    nif: 777777777,
    nome: "Umbelina Ulmeiro",
    genero: 'feminino'
  },
  {
    nif: 666666666,
    nome: "Tiago Teixeira",
    genero: 'masculino'
  },
];

const GESTORES = [
  {
    nif: 101010101,
    nome: 'Zacarias Zebedeu',
    genero: 'masculino'
  }
];

const TURNOS = [
  {
    inicio: Date.parse('2025-05-01T08:00:00.000Z'),
    fim: Date.parse('2025-05-01T14:30:00.000Z')
  },
  {
    inicio: Date.parse('2025-05-12T07:30:00.000Z'),
    fim: Date.parse('2025-05-12T13:00:00.000Z')
  },
  {
    inicio: Date.parse('2025-05-20T13:30:00.000Z'),
    fim: Date.parse('2025-05-20T20:00:00.000Z')
  },
  {
    inicio: Date.parse('2025-05-11T13:30:00.000Z'),
    fim: Date.parse('2025-05-11T20:00:00.000Z')
  }
];

const PEDIDOS = [
  {
    moradaDe: {
      rua: "R. Ernesto de Vasconcelos",
      localidade: "Campo Grande, Lisboa",
      codigoPostal: "1749-016",
      numeroDePorta: "C8"
    },
    moradaPara: {
      rua: "Alameda das Comunidades Portuguesas",
      localidade: "Lisboa",
      codigoPostal: "1700-111",
      numeroDePorta: "1"
    },
    numDePassageiros: 4,
    luxuoso: false,
    coordenadasDe: "38.75701927708848, -9.156780305122467",
    coordenadasPara: "38.77870772499119, -9.132030178350218",
    status: "pendente"
  },
  {
    moradaDe: {
      rua: "R. Ernesto de Vasconcelos",
      localidade: "Campo Grande, Lisboa",
      codigoPostal: "1749-016",
      numeroDePorta: "C8"
    },
    moradaPara: {
      rua: "Praia do Rei",
      localidade: "Costa da Caparica",
      codigoPostal: "2825-491",
      numeroDePorta: "1"
    },
    numDePassageiros: 2,
    luxuoso: true,
    coordenadasDe: "38.75701927708848, -9.156780305122467",
    coordenadasPara: "38.606444967143915, -9.212492203308729",
    status: "pendente"
  },
    {
    moradaDe: {
      rua: "Largo do Mercado",
      localidade: "Fornos de Algodres",
      codigoPostal: "6370-142",
      numeroDePorta: "1"
    },
    moradaPara: {  
      rua: "Largo dos Navegantes",
      localidade: "Ericeira",
      codigoPostal: "2655-320",
      numeroDePorta: "1"
    },
    numDePassageiros: 2,
    luxuoso: false,
    coordenadasDe: "40.6213180721912, -7.5402981464079755",
    coordenadasPara: "38.960654296736145, -9.416904492590183",
    status: "pendente"
  }
];

const VIAGENS = [
  {
    seq: 1,
    partida: {
      rua: "R. Ernesto de Vasconcelos",
      localidade: "Campo Grande, Lisboa",
      codigoPostal: "1749-016",
      numeroDePorta: "C8"
    },
    chegada: {
      rua: "Alameda das Comunidades Portuguesas",
      localidade: "Lisboa",
      codigoPostal: "1700-111",
      numeroDePorta: "1"
    },
    numeroDePassageiros: 4,
    inicio: Date.parse('2025-05-01T08:00:00.000Z'),
    fim: Date.parse('2025-05-01T08:15:00.000Z'),
    kilometros: 5,
    custo: 14
  },
  {
    seq: 2,
    partida: {
      rua: "R. Ernesto de Vasconcelos",
      localidade: "Campo Grande, Lisboa",
      codigoPostal: "1749-016",
      numeroDePorta: "C8"
    },
    chegada: {
      rua: "Praia do Rei",
      localidade: "Costa da Caparica",
      codigoPostal: "2825-491",
      numeroDePorta: "1"
    },
    numeroDePassageiros: 2,
    inicio: Date.parse('2025-08-01T14:00:00.000Z'),
    fim: Date.parse('2025-08-01T15:07:00.000Z'),
    kilometros: 30,
    custo: 60
  },
    {
    seq: 3,
    partida: {
      rua: "Largo do Mercado",
      localidade: "Fornos de Algodres",
      codigoPostal: "6370-142",
      numeroDePorta: "1"
    },
    chegada: {  
      rua: "Largo dos Navegantes",
      localidade: "Ericeira",
      codigoPostal: "2655-320",
      numeroDePorta: "1"
    },
    numeroDePassageiros: 2,
    inicio: Date.parse('2025-03-01T06:00:00.000Z'),
    fim: Date.parse('2025-03-01T09:30:00.000Z'),
    kilometros: 207,
    custo: 150
  },
    {
    seq: 4,
    partida: {
      rua: "R. Ernesto de Vasconcelos",
      localidade: "Campo Grande, Lisboa",
      codigoPostal: "1749-016",
      numeroDePorta: "C8"
    },
    chegada: {  
      rua: "Largo dos Navegantes",
      localidade: "Ericeira",
      codigoPostal: "2655-320",
      numeroDePorta: "1"
    },
    numeroDePassageiros: 2,
    inicio: Date.parse('2025-04-01T10:15:00.000Z'),
    fim: Date.parse('2025-04-01T10:57:00.000Z'),
    kilometros: 80,
    custo: 76
  },
    {
    seq: 5,
    partida: {
      rua: "R. Ernesto de Vasconcelos",
      localidade: "Campo Grande, Lisboa",
      codigoPostal: "1749-016",
      numeroDePorta: "C8"
    },
    chegada: {
      rua: "Largo do Mercado",
      localidade: "Fornos de Algodres",
      codigoPostal: "6370-142",
      numeroDePorta: "1"
    },
    numeroDePassageiros: 2,
    inicio: Date.parse('2025-05-01T10:15:00.000Z'),
    fim: Date.parse('2025-05-01T16:35:00.000Z'),
    kilometros: 296,
    custo: 204
  }
];