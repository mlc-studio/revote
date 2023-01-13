import express from 'express';

import AuthController from './controllers/auth.controller.js';
import ReVoteController from './controllers/revote.controller.js';

import isAuth from './middlewares/isAuth.js';

const router = express.Router();

// Auth
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/me', isAuth, AuthController.me);

// Revotes
router.get('/revotes', isAuth, ReVoteController.get);
router.post('/revotes', isAuth, ReVoteController.create);
router.post('/revotes/vote', isAuth, ReVoteController.vote);
router.get('/revotes/vote', isAuth, ReVoteController.countVotes);
router.delete('/revotes/:id', isAuth, ReVoteController.delete);

// 404
router.get('*', (req, res) => { res.status(404).json({ message: 'Not found' }) });

export default router;