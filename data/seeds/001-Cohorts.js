
exports.seed = function (knex, Promise) {

  return knex('cohorts').insert([
    { name: 'WEB18' },
    { name: 'WEB19' },
    { name: 'WEB-PT4' }
  ]);
};
