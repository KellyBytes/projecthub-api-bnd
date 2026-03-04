import Project from '../models/projectModel.js';

// Create new project | POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const { team, title, description } = req.body;

    const project = await Project.create({ team, title, description });

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (err) {
    next(err);
  }
};

// Get all projects | GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();

    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(projects.slice(0, limit));
    }

    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// Get single project | GET /api/projects/:id
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      const error = new Error('Project not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// Update project | PATCH /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    // {} = truthyなので以下を追加
    if (Object.keys(req.body).length === 0) {
      const error = new Error('No project provided for update');
      error.status = 404;
      return next(error);
    }

    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      const error = new Error('Project not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Project updated', project });
  } catch (err) {
    next(err);
  }
};

// Delete project | DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      const error = new Error('Project not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
};
