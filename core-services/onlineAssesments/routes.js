const express = require("express");
const router = express.Router();
const { OnlineAssessment, Company, College } = require("../../database/models");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const auth = require("../../middleware/auth");

const { Upload } = require("@aws-sdk/lib-storage");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//s3 sdk
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;

const s3Client = new S3Client({
  region,
});
//
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { companyName, collegeName, year } = req.body;
    const file = req.file;
    //create parameters for uploading into S#
    const params = {
      Bucket: bucketName,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    // Upload file to S3
    const upload = new Upload({
      client: s3Client,
      params: params,
    });

    const data = await upload.done();
    //
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let company = await Company.findOne({ where: { name: companyName } });
    if (!company) {
      company = await Company.create({ name: companyName });
    }

    let college = await College.findOne({ where: { name: collegeName } });
    if (!college) {
      college = await College.create({ name: collegeName });
    }
    //generate url
    const pdfUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${req.file.originalname}`;
    const onlineAssessment = await OnlineAssessment.create({
      pdfUrl,
      year,
      CompanyId: company.id,
      CollegeId: college.id,
      UploaderId: req.user ? req.user.id : null,
    });

    res.status(201).json({
      message: "Online assessment uploaded successfully",
      id: onlineAssessment.id,
    });
  } catch (error) {
    console.error("Error uploading online assessment:", error);
    res.status(500).json({
      message: "Error uploading online assessment",
      error: error.message,
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { companyId, collegeId, year } = req.query;
    const where = {};
    if (companyId) where.CompanyId = companyId; // Note the capital 'C'
    if (collegeId) where.CollegeId = collegeId; // Note the capital 'C'
    if (year) where.year = year;

    const onlineAssessments = await OnlineAssessment.findAll({
      where,
      include: [
        { model: Company, attributes: ["id", "name", "logo"] },
        { model: College, attributes: ["id", "name", "logo"] },
      ],
    });

    res.json(onlineAssessments);
  } catch (error) {
    console.error("Error fetching online assessments:", error);
    res.status(500).json({
      message: "Error fetching online assessments",
      error: error.message,
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const onlineAssessment = await OnlineAssessment.findByPk(req.params.id, {
      include: [
        { model: Company, attributes: ["id", "name", "logo"] },
        { model: College, attributes: ["id", "name", "logo"] },
      ],
    });

    if (!onlineAssessment) {
      return res.status(404).json({ message: "Online assessment not found" });
    }

    res.json(onlineAssessment);
  } catch (error) {
    console.error("Error fetching online assessment:", error);
    res.status(500).json({
      message: "Error fetching online assessment",
      error: error.message,
    });
  }

  router.post("/testing", upload.single("img"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        res.send("file not given");
      }
      res.send(file);
    } catch (err) {
      console.log("error occures");
      res.send("error uploading to bucket");
    }
  });
});

module.exports = router;
