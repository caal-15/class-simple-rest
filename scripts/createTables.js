const db = require('../database');
const multiplications = require('../repositories/multiplications')(db);

multiplications
  .createMultiplicationsTable()
  .then(() => {
    console.log('All Tables Created!');
    db.destroy();
  })
  .catch(() => {
    console.log('Error creating Tables');
    db.destroy();
  });
