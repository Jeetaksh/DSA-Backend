const express = require("express");
const topicRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const Auth = require("../MiddleWare/Auth");

const prisma = new PrismaClient();   



topicRouter.get('/topics',async (req, res) => {
  try {


    const topics = await prisma.topic.findMany();
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});



topicRouter.get('/topics/:topicId/questions',async (req, res) => {
    const { topicId } = req.params;
  
    try {
      const questions = await prisma.question.findMany({
        where: {
          topicId: topicId,
        },
      });
      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  });
  
  topicRouter.post('/questions/search',async (req, res) => {
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
  
    try {
      const questions = await prisma.question.findMany({
        where: {
          name: {
            contains: title,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          name: true,
          link: true,
        },
      });
      res.json(questions);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to fetch questions' });
      }
    }
  });
  
  module.exports = topicRouter;