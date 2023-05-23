// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an instance of the Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Create an instance of the Handlebars engine with helpers
const hbs = exphbs.create({ helpers });

// Set up the session configuration
const sess = {
secret: 'Tech blog secret',
cookie: {},
resave: false,
saveUninitialized: true,
store: new SequelizeStore({
db: sequelize
})
};

// Set up session middleware
app.use(session(sess));

// Set up view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
  });


// Synchronize the database and start the server
// sequelize.sync({ force: false }).then(() => {
// app.listen(PORT, () => console.log('Now listening'));
// });