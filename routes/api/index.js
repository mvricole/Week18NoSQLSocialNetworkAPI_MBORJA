
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// These routers will map URLs, in this case various code docs, to functions found in other parts of the application. 
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
