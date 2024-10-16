const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// Get all reports (with access control)
router.get('/', auth, async (req, res) => {
  try {
    const userType = req.user.userType;
    let accessLevels;

    switch (userType) {
      case 'creator':
        accessLevels = ['public', 'registered', 'investor', 'creator'];
        break;
      case 'investor':
        accessLevels = ['public', 'registered', 'investor'];
        break;
      case 'registered':
        accessLevels = ['public', 'registered'];
        break;
      default:
        accessLevels = ['public'];
    }

    const reports = await Report.find({ accessLevel: { $in: accessLevels } })
      .select('-content')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single report (with access control)
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    const userType = req.user.userType;
    const accessLevels = {
      creator: ['public', 'registered', 'investor', 'creator'],
      investor: ['public', 'registered', 'investor'],
      registered: ['public', 'registered'],
      visitor: ['public'],
    };

    if (!accessLevels[userType].includes(report.accessLevel)) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.json(report);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Report not found' });
    }
    res.status(500).send('Server error');
  }
});

// Create a new report (creators only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'creator') {
      return res.status(403).json({ msg: 'Only creators can post reports' });
    }

    const { title, description, content, accessLevel, contentType } = req.body;

    const newReport = new Report({
      title,
      description,
      content,
      author: req.user.id,
      accessLevel,
      contentType,
    });

    const report = await newReport.save();
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a report (creators only, own reports)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'creator') {
      return res.status(403).json({ msg: 'Only creators can update reports' });
    }

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    if (report.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'User not authorized to update this report' });
    }

    const { title, description, content, accessLevel, contentType } = req.body;

    report.title = title || report.title;
    report.description = description || report.description;
    report.content = content || report.content;
    report.accessLevel = accessLevel || report.accessLevel;
    report.contentType = contentType || report.contentType;

    await report.save();
    res.json(report);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Report not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete a report (creators only, own reports)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'creator') {
      return res.status(403).json({ msg: 'Only creators can delete reports' });
    }

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    if (report.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'User not authorized to delete this report' });
    }

    await report.remove();
    res.json({ msg: 'Report removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Report not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;