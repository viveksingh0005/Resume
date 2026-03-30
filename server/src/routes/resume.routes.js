const express = require('express');
const router = express.Router();

const { generateResumePDF } = require('../controllers/pdf.controller');

router.post('/generate-pdf', generateResumePDF);



module.exports = router;