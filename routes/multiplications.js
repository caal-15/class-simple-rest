const express = require('express');

const generateFactor = () => Math.round(Math.random().toFixed(3) * 1000);

const multiplicationsRouter = multiplicationsRepository => {
  const router = express.Router();

  router.get('/random', (_, res) => {
    res.json({
      factorA: generateFactor(),
      factorB: generateFactor()
    });
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
      .then(() =>
        res.status(201).json({
          correct:
            multiplication.factorA * multiplication.factorB === resultAttempt
        })
      );
  });

  router.get('/', (req, res) =>
    multiplicationsRepository
      .getMultiplications({ ...req.query })
      .then(rows => {
        const rowsWithResults = rows.map(row => ({
          ...row,
          correct: row.factorA * row.factorB === row.resultAttempt
        }));
        res.json(rowsWithResults);
      })
  );

  return router;
};

module.exports = multiplicationsRouter;
