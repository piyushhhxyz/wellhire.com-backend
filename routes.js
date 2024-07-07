const express = require('express');
const router = express.Router();

const authRoutes = require('./core-services/auth/routes');
const companyRoutes = require('./core-services/companies/routes');
const collegeRoutes = require('./core-services/colleges/routes');

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/colleges', collegeRoutes);

module.exports = router;