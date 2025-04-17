// /heroes - GET
exports.hero_list = asyncHandler(async (req, res, next) => {
  const heroes = await Hero.find().sort({ name: 1 }).exec();
  res.status(200).send({heroes: heroes});
});
  
// /hero/id - GET
exports.hero_detail = asyncHandler(async (req, res, next) => {
  const hero = await Hero.findById(req.params.id).exec();
  if (hero === null) {
    res.status(404).send();
    return;
  }
  res.status(200).send({hero: hero});
});

// /hero - POST
exports.hero_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty nor too big.")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("pet").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
  
    // Create a Hero object with escaped and trimmed data.
    const hero = new Hero({
      name: req.body.name
    });
    if (req.body.pet) hero.pet = req.body.pet;
  
    if (!errors.isEmpty()) {
      // 400 - Bad Request
      res.status(400).send({errors: errors});
    } else {
      const sameHero = await Hero.find(hero).exec();
      if (sameHero.length) {
        // 200 - OK
        res.status(200).send({warning: "Duplicate Hero. No new Hero created!"});
      } else {
        // 201 - Created
        await hero.save();
        const newHero = await Hero.findById(hero._id).exec();
        res.status(201).send({hero: newHero});
      }
    }
  }),
];