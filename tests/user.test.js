import request from 'supertest';
import app from '../src/app.js';
import { generateToken } from '../src/utils/auth.js';

describe('User Routes', () => {
  let authToken;

  beforeAll(async () => {
    // Generate token before running tests
    authToken = await generateToken({ userId: 'user_id_here' });
  });

  it('should register a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    const response = await request(app)
      .post('/user/register')
      .send(userData)
      .expect(201);

    // Assert response properties
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userId');
  });

  it('should log in a user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };
    const response = await request(app)
      .post('/user/login')
      .send(userData)
      .expect(200);

    // Assert response properties
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userId');
  });


  it('should search for contacts', async () => {
    const query = 'John Doe';
    const response = await request(app)
      .get(`/user/search?query=${query}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    // Assert response properties
    expect(Array.isArray(response.body)).toBe(true);
  });
});
