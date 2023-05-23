const sequelize = require('../config/config');
const seedUser = require('./userData');
const seedPost = require('./postData');

const seedAll = async () => {
  // Sync the database tables (force:true will drop and recreate the tables)
  await sequelize.sync({ force: true });

  // Seed user data
  await seedUser();

  // Seed post data
  await seedPost();

  process.exit(0);
};

// Run all database seeding
seedAll();