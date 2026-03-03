import express from 'express';
import { body, param } from 'express-validator';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../../src/controllers/projectController.js';
import { protect, adminOnly } from '../middleware/authentication.js';
import validate from '../middleware/validate.js';

const router = express.Router();

// Create new project
router.post(
  '/create',
  protect,
  [
    body('team').notEmpty().withMessage('Team is required'),
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 100 })
      .withMessage('Title must be under 100 characters'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  validate,
  createProject,
);

// Get all projects
router.get('/', getProjects);

// Get single project
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid project ID')],
  validate,
  getProject,
);

// Update project
router.patch(
  '/:id',
  protect,
  [
    param('id').isMongoId().withMessage('Invalid project ID'),
    body('team').optional().notEmpty(),
    body('title').optional().isLength({ max: 100 }),
    body('description').optional().notEmpty(),
  ],
  validate,
  updateProject,
);

// Delete project
router.delete(
  '/:id',
  protect,
  adminOnly,
  [param('id').isMongoId().withMessage('Invalid project ID')],
  validate,
  deleteProject,
);

export default router;
