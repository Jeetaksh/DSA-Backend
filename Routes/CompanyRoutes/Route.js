const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Route to get all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Route to get questions for a specific company
router.get('/companies/:companyId/questions', async (req, res) => {
  const { companyId } = req.params;

  try {
    const questions = await prisma.question.findMany({
      where: {
        companyId: companyId,
      },
    });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

module.exports = router;
