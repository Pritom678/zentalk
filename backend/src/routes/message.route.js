import express from 'express';

const router = express.Router();

router.get('/send', (req, res) => {
  res.send({ message: 'Send message endpoint' });
});

router.get('/inbox', (req, res) => {
  res.send({ message: 'Inbox endpoint' });
});

export default router;