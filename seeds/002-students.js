
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Tom'},
        {cohort_id: 1, name: 'Rick'},
        {cohort_id: 1, name: 'Morty'},
        {cohort_id: 2, name: 'Bob'},
        {cohort_id: 2, name: 'Arthur'},
        {cohort_id: 2, name: 'Jon'},
        {cohort_id: 3, name: 'Davos'},
        {cohort_id: 3, name: 'Arya'},
        {cohort_id: 3, name: 'Brandon'}
      ]);
    });
};
