const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/auth');


const authRoutes = require('./core-services/auth/routes');
const companyRoutes = require('./core-services/companies/routes');
const collegeRoutes = require('./core-services/colleges/routes');
const onlineAssessmentRoutes = require('./core-services/onlineAssesments/routes')

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/colleges', collegeRoutes);
router.use('/online-assessments', onlineAssessmentRoutes);

module.exports = router;