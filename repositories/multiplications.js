const db = require('../database');

const createMultiplicationsTable = () => db.schema
  .hasTable('multiplications')
  .then(multiplicationsTableExists => {
    if (multiplicationsTableExists) {
      console.log('Multiplications Table already Created');
      return Promise.resolve();
    } else {
      return db.schema.createTable('multiplications', table => {
        table.integer('userAlias').notNullable();
        table.integer('factorA').notNullable();
        table.integer('factorB').notNullable();
        table.integer('resultAttempt').notNullable();
        console.log('Multiplications Table Created');
      });
    }
  });

const createMultiiplication = multiplication =>
  db('multiplications').insert(multiplication)


module.exports = {
  createMultiplicationsTable,
  createMultiiplication
}
