const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Set up routes for the home page
router.use('/', homeRoutes);

// Set up routes for the dashboard
router.use('/dashboard', dashboardRoutes);

// Set up routes for the API
router.use('/api', apiRoutes);

// Catch-all route for handling 404 errors (optional)
// router.use((req, res) => {
//   res.status(404).end();
// });

module.exports = router;






