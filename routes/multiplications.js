const express = require('express');

const multiplicationsRepository = require('../repositories/multiplications');

const router = express.Router();

const generateFactor = () => Math.round(Math.random().toFixed(4) * 10000);

router.get('/random', (_, res) => {
  res.json({
    factorA: generateFactor(),
    factorB: generateFactor()
  })
});

router.post('/', (req, res) => {
  const { user, multiplication, resultAttempt } = req.body;
  const multiplicationData = {
    userAlias: user.alias,
    factorA: multiplication.factorA,
    factorB: multiplication.factorB,
    resultAttempt
  };
  return multiplicationsRepository
    .createMultiiplication(multiplicationData)
    .then(() => res.status(201).json({
      correct: (
        multiplication.factorA * multiplication.factorB === resultAttempt
      )
    }));
});

module.exports = router;
