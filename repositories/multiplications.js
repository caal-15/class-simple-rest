const multiplicationsRepository = db => ({
  createMultiplicationsTable: () =>
    db.schema.hasTable('multiplications').then(multiplicationsTableExists => {
      if (multiplicationsTableExists) {
        console.log('Multiplications Table already Created');
        return Promise.resolve();
      } else {
        return db.schema.createTable('multiplications', table => {
          table.increments('id');
          table.integer('userAlias').notNullable();
          table.integer('factorA').notNullable();
          table.integer('factorB').notNullable();
          table.integer('resultAttempt').notNullable();
          console.log('Multiplications Table Created');
        });
      }
    }),
  createMultiiplication: multiplication =>
    db('multiplications').insert(multiplication),
  getMultiplications: ({ userAlias, count, sort, order }) => {
    let query = db.select('*').from('multiplications');
    if (userAlias) query = query.where({ userAlias });
    if (sort) query = query.orderBy(sort, order || 'asc');
    if (count) query = query.limit(count);

    return query;
  }
});

module.exports = multiplicationsRepository;
