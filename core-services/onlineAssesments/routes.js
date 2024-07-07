const express = require('express');
const router = express.Router();
const { OnlineAssessment, Company, College } = require('../../database/models');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads');  // Updated path
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
      const { companyName, collegeName, year } = req.body;
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      let company = await Company.findOne({ where: { name: companyName } });
      if (!company) {
        company = await Company.create({ name: companyName });
      }
  
      let college = await College.findOne({ where: { name: collegeName } });
      if (!college) {
        college = await College.create({ name: collegeName });
      }
  
      const pdfUrl = `/uploads/${file.filename}`;
  
      const onlineAssessment = await OnlineAssessment.create({
        pdfUrl,
        year,
        CompanyId: company.id,
        CollegeId: college.id,
        UploaderId: req.user ? req.user.id : null
      });
  
      res.status(201).json({ message: 'Online assessment uploaded successfully', id: onlineAssessment.id });
    } catch (error) {
      console.error('Error uploading online assessment:', error);
      res.status(500).json({ message: 'Error uploading online assessment', error: error.message });
    }
  });

router.get('/', async (req, res) => {
    try {
      const { companyId, collegeId, year } = req.query;
      const where = {};
      if (companyId) where.CompanyId = companyId;  // Note the capital 'C'
      if (collegeId) where.CollegeId = collegeId;  // Note the capital 'C'
      if (year) where.year = year;
    
      const onlineAssessments = await OnlineAssessment.findAll({
      where,
      include: [
        { model: Company, attributes: ['id', 'name', 'logo'] },
        { model: College, attributes: ['id', 'name', 'logo'] }
      ]
    });

    res.json(onlineAssessments);
  } catch (error) {
    console.error('Error fetching online assessments:', error);
    res.status(500).json({ message: 'Error fetching online assessments', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const onlineAssessment = await OnlineAssessment.findByPk(req.params.id, {
      include: [
        { model: Company, attributes: ['id', 'name', 'logo'] },
        { model: College, attributes: ['id', 'name', 'logo'] }
      ]
    });

    if (!onlineAssessment) {
      return res.status(404).json({ message: 'Online assessment not found' });
    }

    res.json(onlineAssessment);
  } catch (error) {
    console.error('Error fetching online assessment:', error);
    res.status(500).json({ message: 'Error fetching online assessment', error: error.message });
  }
});

module.exports = router;