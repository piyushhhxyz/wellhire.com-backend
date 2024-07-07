const express = require('express');
const router = express.Router();
const { Company, College } = require('../../database/models');

router.get('/', async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id, {
            include: [College]
        });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error: error.message });
    }
});

module.exports = router;