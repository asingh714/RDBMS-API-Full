
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Jon Snow'},
        {cohort_id: 1, name: 'Arya Stark'},
        {cohort_id: 2, name: 'Daenerys Targaryen'},
        {cohort_id: 2, name: 'Brienne of Tarth'},
        {cohort_id: 3, name: 'Bran Stark'},
        {cohort_id: 3, name: 'Davos Seaworth'},
      ]);
    });
};
