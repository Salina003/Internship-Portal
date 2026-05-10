const express = require('express');
const { Certificate } = require('../models');
const router = express.Router();

// Get certificates for logged-in user (must come before /:id route)
router.get('/my', async (req, res) => {
  try {
    // TODO: Replace with real authenticated user id
    const userId = req.user?.id || 1;

    const certificates = await Certificate.findAll({ where: { userId } });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download certificate PDF by id (before /:id route)
router.get('/:id/download', async (req, res) => {
  try {
    const certificateId = req.params.id;

    // Example placeholder PDF response
    const samplePdf = Buffer.from(
      `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 55 >>
stream
BT
70 50 TD
/F1 24 Tf
(Placeholder PDF) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000018 00000 n 
0000000077 00000 n 
0000000178 00000 n 
0000000271 00000 n 
trailer
<< /Root 1 0 R /Size 5 >>
startxref
355
%%EOF`,
      'utf-8'
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate_${certificateId}.pdf`);
    res.send(samplePdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single certificate by id (generic dynamic route - placed last)
router.get('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findByPk(req.params.id);
    if (certificate) {
      res.json(certificate);
    } else {
      res.status(404).json({ error: 'Certificate not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.findAll();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a certificate
router.post('/', async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a certificate by id
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Certificate.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCertificate = await Certificate.findByPk(req.params.id);
      res.json(updatedCertificate);
    } else {
      res.status(404).json({ error: 'Certificate not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a certificate by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Certificate.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Certificate deleted' });
    } else {
      res.status(404).json({ error: 'Certificate not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;