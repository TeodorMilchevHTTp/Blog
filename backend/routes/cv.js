const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const CVRequest = require('../models/CVRequest');

const router = express.Router();

// --- Create a new CV request ---
router.post('/request', async (req, res) => {
  try {
    const { email, reason } = req.body;
    if (!email || !reason)
      return res.status(400).json({ error: 'Email and reason are required.' });

    const request = new CVRequest({ email, reason, status: 'pending' });
    await request.save();

    res.json({ message: 'CV request submitted successfully!' });
  } catch (err) {
    console.error('Error saving CV request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Get all requests (admin) ---
router.get('/requests', async (req, res) => {
  try {
    const requests = await CVRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// --- Approve or Reject a request ---
router.post('/approve/:id', async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    const request = await CVRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ error: 'Request not found' });

    // Handle rejection
    if (status === 'rejected') {
      await request.deleteOne();
      return res.json({ message: 'Request rejected and removed.' });
    }

    // Handle approval
    if (status === 'approved') {
      const cvPath = path.join(__dirname, '../assets/MyCV.pdf');
      if (!fs.existsSync(cvPath)) {
        return res.status(500).json({ error: 'CV file not found on server.' });
      }

      // Configure mail transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Compose email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: request.email,
        subject: 'Your CV Request Has Been Approved',
        text: 'Hello! Your CV request has been approved. Please find my CV attached. Thank you for your interest!',
        attachments: [
          {
            filename: 'MyCV.pdf',
            path: cvPath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      // Mark as approved in DB
      request.status = 'approved';
      await request.save();

      return res.json({ message: 'Request approved and CV sent successfully.' });
    }

    res.status(400).json({ error: 'Invalid status value' });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ error: 'Failed to update request' });
  }
});

module.exports = router;
