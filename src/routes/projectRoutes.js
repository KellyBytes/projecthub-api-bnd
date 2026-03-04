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

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - team
 *               - title
 *               - description
 *             properties:
 *               team:
 *                 type: string
 *               title:
 *                 type: string
 *                 maxLength: 100
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
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

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Returns a list of projects
 */
router.get('/', getProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a single project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB project ID
 *     responses:
 *       200:
 *         description: Returns a single project
 *       400:
 *         description: Invalid project ID
 *       404:
 *         description: Project not found
 */
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid project ID')],
  validate,
  getProject,
);

/**
 * @swagger
 * /api/projects/{id}:
 *   patch:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Validation error
 *       404:
 *         description: Project not found
 */
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

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project (Admin only)
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Project not found
 */
router.delete(
  '/:id',
  protect,
  adminOnly,
  [param('id').isMongoId().withMessage('Invalid project ID')],
  validate,
  deleteProject,
);

export default router;
