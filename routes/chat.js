import express from 'express';
import { Chat } from '../models/Chat.js';

const router = express.Router();

// Create new chat
router.post('/', async (req, res) => {
  try {
    const chat = new Chat(req.body);
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get chat messages
router.get('/:chatId', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate('participants')
      .populate('messages.sender');
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send message
router.post('/:chatId/messages', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    chat.messages.push(req.body);
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const chatRoutes = router;