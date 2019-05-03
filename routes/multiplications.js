const express = require('express');

const multiplicationsRepository = require('../repositories/multiplications');

const router = express.Router();

const generateFactor = () => Math.random().toFixed(4) * 10000;

router.get('/random', (_, res) => {
  res.json({
    factorA: generateFactor(),
    factorB: generateFactor()
  })
});

router.post('/', (req, res) => {
  const { user, factorA, factorB, resultAttempt } = req.body;
  const multiplication = {
    userAlias: user.alias,
    factorA,
    factorB,
    resultAttempt
  };
  return multiplicationsRepository
    .createMultiiplication(multiplication)
    .then(() => res.json({ correct: (factorA * factorB === resultAttempt) }));
});

module.exports = router;
