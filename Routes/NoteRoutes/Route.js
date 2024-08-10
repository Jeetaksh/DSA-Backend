const express = require("express");
const noteRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const Auth = require("../MiddleWare/Auth");
const prisma = new PrismaClient();

// Route to get all notes of a particular question by a particular user email
noteRouter.get('/notes', async (req, res) => {
  try {
    const { questionId, email } = req.query;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notes = await prisma.note.findMany({
      where: {
        questionId: questionId,
        userId: user.id
      }
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Route to add a note by a user email to a particular question
noteRouter.post('/notes', Auth,async (req, res) => {

  console.log("authenticated");
  console.log(req.user);
  const { content, questionId } = req.body;
const email= req.user.email;


  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const note = await prisma.note.create({
      data: {
        content: content,
        questionId: questionId,
        userId: user.id
      }
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add note' });
  }
});

module.exports = noteRouter;
