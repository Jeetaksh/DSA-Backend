const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// // Add a note to a question
// router.post('/questions/:questionId/notes', async (req, res) => {
//   const { questionId } = req.params;
//   const { content, userId } = req.body; // Assuming userId is sent in the request body

//   try {
//     const note = await prisma.note.create({
//       data: {
//         content,
//         question: { connect: { id: questionId } },
//         user: { connect: { id: userId } }, // Assuming a User model exists
//       },
//     });
//     res.json(note);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create note' });
//   }
// });

// Get all solved questions for a particular user

// Add a question to the solved questions list
// router.post('/users/:userId/solved-questions/:questionId',async (req, res) => {
//   console.log("called me me me");
//   const { userId, questionId } = req.params;

//   try {
//     const solvedQuestion = await prisma.solvedBy.create({
//       data: {
//         user: { connect: { id: userId } },
//         question: { connect: { id: questionId } },
//       },
//     });
//     res.json(solvedQuestion);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add solved question' });
//   }
// });

// Remove a question from the solved questions list
// router.delete('/users/:userId/solved-questions/:questionId', async (req, res) => {
//   const { userId, questionId } = req.params;

//   try {
//     await prisma.solvedBy.deleteMany({
//       where: {
//         userId,
//         questionId,
//       },
//     });
//     res.json({ message: 'Solved question removed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to remove solved question' });
//   }
// });







// Get all notes by a particular user
router.get('/users/:userId/notes', async (req, res) => {
  const { userId } = req.params;

  try {
    const notes = await prisma.note.findMany({
      where: { userId },
      include: { question: true },
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
});

module.exports = router;
