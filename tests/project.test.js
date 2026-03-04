import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../src/app.js';

let mongoServer;
let token; // JWT
let adminToken;
const agent = request(app);

process.env.JWT_SECRET = 'testsecret';

beforeAll(async () => {
  // Create memory DB & connect
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Test user
  const testUser = {
    username: 'projuser',
    email: `prjuser_${Date.now()}@example.com`,
    password: 'password123',
    role: 'member',
  };

  await agent.post('/api/users/register').send(testUser);

  const loginRes = await agent.post('/api/users/login').send({
    email: testUser.email,
    password: testUser.password,
  });
  token = loginRes.body.token;

  // Admin
  const adminUser = {
    username: 'adminuser',
    email: `admin_${Date.now()}@example.com`,
    password: 'password123',
    role: 'admin',
  };

  await agent.post('/api/users/register').send(adminUser);

  const adminLoginRes = await agent.post('/api/users/login').send({
    email: adminUser.email,
    password: adminUser.password,
  });
  adminToken = adminLoginRes.body.token;
});

afterAll(async () => {
  // Disconnect & stop memory DB
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Project Routes + JWT Auth', () => {
  let projectId;

  it('should create a new project', async () => {
    const res = await agent
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        team: 'Team Alpha',
        title: 'Project A',
        description: 'First test project',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.project).toHaveProperty('title', 'Project A');
    projectId = res.body.project._id;
  }, 10000);

  it('should get all projects', async () => {
    const res = await agent.get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  }, 10000);

  it('should get a single project', async () => {
    const res = await agent.get(`/api/projects/${projectId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', projectId);
  }, 10000);

  it('should update a project', async () => {
    const res = await agent
      .patch(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Project A Updated',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.project).toHaveProperty('title', 'Project A Updated');
  }, 10000);

  it('should delete a project (admin only test)', async () => {
    const res = await agent
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Project deleted successfully');
  }, 10000);
});
