import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    team: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
