'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const companies = [
      { id: uuidv4(), name: 'Google', logo: 'google_logo.png', headerImage: 'google_header.jpg' },
      { id: uuidv4(), name: 'Amazon', logo: 'amazon_logo.png', headerImage: 'amazon_header.jpg' },
      { id: uuidv4(), name: 'Microsoft', logo: 'microsoft_logo.png', headerImage: 'microsoft_header.jpg' }
    ];

    const colleges = [
      { id: uuidv4(), name: 'IIT Delhi', logo: 'iitd_logo.png', headerImage: 'iitd_header.jpg' },
      { id: uuidv4(), name: 'IIT Bombay', logo: 'iitb_logo.png', headerImage: 'iitb_header.jpg' },
      { id: uuidv4(), name: 'BITS Pilani', logo: 'bits_logo.png', headerImage: 'bits_header.jpg' }
    ];

    await queryInterface.bulkInsert('Companies', companies.map(company => ({
      ...company,
      metadata: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    })));

    await queryInterface.bulkInsert('Colleges', colleges.map(college => ({
      ...college,
      metadata: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', null, {});
    await queryInterface.bulkDelete('Colleges', null, {});
  }
};