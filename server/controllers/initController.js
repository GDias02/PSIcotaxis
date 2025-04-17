exports.init = asyncHandler(async (req, res) => {
    const heroes = [];
    const pets = [];
    
    main().catch((err) => console.log(err));
    
    async function main() {
      await Hero.deleteMany({});
      await Pet.deleteMany({});
      await createPets();
      await createHeroes();
      res.status(200).send();
    }

    async function configCreate(index, name) {
      const pet = new Pet({ name: name });
      await pet.save();
      pets[index] = pet;
    }
  
    async function taxiCreate(index, name) {
      const pet = new Pet({ name: name });
      await pet.save();
      pets[index] = pet;
    }
  
    async function motoristaCreate(index, name, pet) {
      const hero = new Hero({ name: name });
      if (pet != false) hero.pet = pet;
      await hero.save();
      heroes[index] = hero;
    }
    
    async function createConfig() {
      await Promise.all([
        petCreate(0, 'Sly the Raccoon'),
        petCreate(1, 'Bentley the Turtle'),
        petCreate(2, 'Murray the Hippo'),
        petCreate(3, 'Carmelita the Fox'),
        petCreate(4, 'Panda King'),
        petCreate(5, 'Sonic the Hedgehog'),
        petCreate(6, 'Shadow the Hedgehog'),
        petCreate(7, 'Spike'),
        petCreate(8, 'Teddy the Bear'),
      ]);
    }
  
    async function createTaxis() {
      await Promise.all([
        heroCreate(0, 'Dr. Nice', pets[0]),
        heroCreate(1, 'Bombasto', pets[0]),
        heroCreate(2, 'Celeritas', pets[4]),
        heroCreate(3, 'Magneta', false),
        heroCreate(4, 'RubberMan', false),
        heroCreate(5, 'Dynama', false),
        heroCreate(6, 'Dr. IQ', pets[6]),
        heroCreate(7, 'Magma', pets[6]),
        heroCreate(8, 'Tornado', pets[7]),
      ]);
    }

    async function createMotoristas() {
      await Promise.all([
        heroCreate(0, 'Dr. Nice', pets[0]),
        heroCreate(1, 'Bombasto', pets[0]),
        heroCreate(2, 'Celeritas', pets[4]),
        heroCreate(3, 'Magneta', false),
        heroCreate(4, 'RubberMan', false),
        heroCreate(5, 'Dynama', false),
        heroCreate(6, 'Dr. IQ', pets[6]),
        heroCreate(7, 'Magma', pets[6]),
        heroCreate(8, 'Tornado', pets[7]),
      ]);
    }
  });

const MOTORISTAS: Motorista[] = [
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