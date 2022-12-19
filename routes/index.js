// This is a main part of the routes folder. It allocates which docs get redirected where. You will see them as requirements in corresponding documents in this api folder. 
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Incorrect Route! Try again!');
});

module.exports = router;
