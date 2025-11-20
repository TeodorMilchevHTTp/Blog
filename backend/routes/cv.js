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
    if (!email || !reason) {
      return res.status(400).json({ error: 'Email and reason are required.' });
    }

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

// --- Get a single CV request by email ---
router.get('/request-status', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const request = await CVRequest.findOne({ email });
    if (!request) return res.status(404).json({ error: 'Request not found' });

    res.json({ status: request.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Approve or Reject a request ---
router.post('/approve/:id', async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    const request = await CVRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ error: 'Request not found' });

    if (status === 'rejected') {
      await request.deleteOne();
      return res.json({ message: 'Request rejected and removed.' });
    }

    if (status === 'approved') {
      const cvPath = path.join(__dirname, '../../public/cv/MyCV.pdf');
      if (!fs.existsSync(cvPath)) {
        return res.status(500).json({ error: 'CV file not found on server.' });
      }

      // Update status first so admin sees it immediately
      request.status = 'approved';
      await request.save();

      // Send email asynchronously
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: request.email,
        subject: 'Your CV Request Has Been Approved',
        text: 'Hello! Your CV request has been approved. Please find my CV attached.',
        attachments: [
          { filename: 'MyCV.pdf', path: cvPath }
        ],
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(`Failed to send CV email to ${request.email}:`, err);
        } else {
          console.log(`CV email sent to ${request.email}:`, info.response);
        }
      });

      // Respond immediately
      return res.json({ message: 'Request approved. CV email is being sent.' });
    }

    res.status(400).json({ error: 'Invalid status value. Use "approved" or "rejected".' });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ error: 'Failed to update request' });
  }
});



module.exports = router;
