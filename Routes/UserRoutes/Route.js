const express = require('express');
const { PrismaClient } = require('@prisma/client');
const Auth = require('../MiddleWare/Auth');
const router = express.Router();

const prisma = new PrismaClient();

// Route to save user name and email
router.post('/users', async (req, res) => {
  console.log(req.body);
  const { name, email ,clerkUserId} = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Create a new user
    const user = await prisma.user.create({
      data: { name, email ,clerkUserId},
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'User could not be created.' });
  }
});


// Route to get total number of solved questions based on email
router.get('/users/:email/solved-questions', async (req, res) => {
    const { email } = req.params;
    console.log("called");
    console.log(email);
  
    try {
      // Find the user by email to get their userId
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Use the userId to find solved questions
      const solvedQuestions = await prisma.solvedBy.findMany({
        where: { userId: user.id },
      });
  
      res.status(200).json({ totalSolvedQuestions: solvedQuestions.length, name: user.name });
    } catch (error) {
      console.error('Error retrieving solved questions:', error);
      res.status(500).json({ error: 'Could not retrieve solved questions.' });
    }
  });





// Route to add or remove a question from the solved questions of the user
router.post('/users/:email/solved-questions',Auth, async (req, res) => {

  console.log("authenticated from add function ...");
  console.log(req.user);

const user = req.user;
  const { questionId, add } = req.body; // Use `add` to determine if adding or removing
  console.log("called me ..");

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    if (add) {
      // Add question to solved questions
      const existingEntry = await prisma.solvedBy.findFirst({
        where: {
          userId: user.id,
          questionId: questionId,
        },
      });

      if (existingEntry) {
        return res.status(400).json({ error: 'Question already marked as solved.' });
      }

      const solvedBy = await prisma.solvedBy.create({
        data: {
          userId: user.id,
          questionId: questionId,
        },
      });

      res.status(201).json(solvedBy);
    } else {
      // Remove question from solved questions
      const existingEntry = await prisma.solvedBy.findFirst({
        where: {
          userId: user.id,
          questionId: questionId,
        },
      });

      if (!existingEntry) {
        return res.status(400).json({ error: 'Question not marked as solved.' });
      }

      await prisma.solvedBy.delete({
        where: {
          id: existingEntry.id,
        },
      });

      res.status(200).json({ message: 'Question removed from solved list.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update solved questions.' });
  }
});











// Route to get all solved questions by a user based on email
router.get('/users/:email/solved-questions/details', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        solvedQuestions: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const solvedQuestions = user.solvedQuestions.map((solved) => solved.question);

    res.status(200).json(solvedQuestions);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve solved questions.' });
  }
});

module.exports = router;
