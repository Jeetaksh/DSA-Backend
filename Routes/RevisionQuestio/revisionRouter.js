const express = require("express");
const revisionRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const Auth = require("../MiddleWare/Auth");

const prisma = new PrismaClient();

revisionRouter.post('/revision-questions', Auth,async (req, res) => {

  console.log("called")
    const { questionId, add } = req.body;

console.log("Authenticated from revies star questions");
console.log(req.user);
const user =req.user;
    try {
      if (add) {
        const revisionQuestion = await prisma.revisionQuestion.create({
          data: {
            question: {
              connect: { id: questionId },
            },
            user: {
              connect: { id: user.id },
            },
          },
        });
        return res.json(revisionQuestion);
      } else {
        const revisionQuestion = await prisma.revisionQuestion.deleteMany({
          where: {
            questionId: questionId,
            userId: user.id,
          },
        });
        return res.json({ message: 'Removed from revision', count: revisionQuestion.count });
      }
    } catch (error) {
      console.error('Error updating revision questions:', error);
      res.status(500).json({ error: 'Error updating revision questions. Please try again.' });
    }
  });
  






revisionRouter.get('/revision-questions/:email', async (req, res) => {
  console.log("called");
    const { email } = req.params;
  
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const revisionQuestions = await prisma.revisionQuestion.findMany({
        where: { userId: user.id },
        include: { question: true },
      });

      res.json(revisionQuestions);
    } catch (error) {
      console.error('Error fetching revision questions:', error);
      res.status(500).json({ error: 'Error fetching revision questions. Please try again.' });
    }
  });
  
  module.exports = revisionRouter;