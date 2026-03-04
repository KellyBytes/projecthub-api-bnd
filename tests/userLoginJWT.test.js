import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../src/app.js';

let mongoServer;
let testUSer;
let token;

process.env.JWT_SECRET = 'testsecret';

beforeAll(async () => {
  // Create memory DB & connect
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Test user info
  testUser = {
    username: 'loginuser',
    email: `loginuser_${Date.now()}@example.com`,
    password: 'password123',
    role: 'member',
  };
});

afterAll(async () => {
  // Disconnect & stop memory DB
  await mongoose.disconnect();
  await mongoServer.stop();
});

const agent = request(app);

describe('User Routes + JTW Auth', () => {
  it('should register a new user', async () => {
    const res = await agent.post('/api/users/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('username', 'loginuser');
  }, 10000);

  it('should login and return JWT token', async () => {
    const res = await agent.post('/api/users/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // To be used for the next test
  }, 10000);

  it('should access protected route with JWT', async () => {
    const res = await agent
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Project',
        description: 'JWT test project',
        team: 'Test Team',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.project).toHaveProperty('title', 'Test Project');
  }, 10000);
});
