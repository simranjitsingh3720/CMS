const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Pages', [{
    id: uuidv4(),
    name: 'Homepage',
    slug: '',
    isHome: true,
    // html: '<span><span></span></span><div id="ier4">Homepage</div>',
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Pages', null, {}),
};
