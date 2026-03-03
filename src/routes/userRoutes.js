import express from 'express';
import { body } from 'express-validator';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/userController.js';
import validate from '../middleware/validate.js';

const router = express.Router();

// router.route('/register').post(registerUser);
router.post(
  '/register',
  [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ max: 30 })
      .withMessage('Username must be under 30 characters'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6, max: 50 })
      .withMessage('Password must be between 6 and 50 characters')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
    body('role')
      .notEmpty()
      .withMessage('Role is required')
      .isIn(['member', 'admin'])
      .withMessage('Invalid role'),
    ,
  ],
  validate,
  registerUser,
);

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6, max: 50 })
      .withMessage('Password must be between 6 and 50 characters')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
  ],
  validate,
  loginUser,
);

router.post('/logout', logoutUser);

export default router;
