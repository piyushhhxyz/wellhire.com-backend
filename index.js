require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const sequelize = require("./database/db");
const routes = require("./routes");
const errorHandler = require("./utils/errorhandler");

const app = express();

//s3 sdk
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;

const s3Client = new S3Client({
  region,
});

//
// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use("/api", routes);
app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("postgresql@14 connected.");
  } catch (error) {
    console.error("postgresql@14 Connection Failed.", error);
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});

//testing s3 api

app.post("/s3", async (req, res) => {
  try {
    console.log(req.file);

    const params = {
      Bucket: bucketName,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand({ params });
    await s3Client.send(command);

    res.send({ msg: "bucket uploading scuessfull" });
  } catch (err) {
    res.send({ msg: "error uploading to bucket" });
    console.log(err.message);
  }
});

//

module.exports = app;
