import request from 'supertest';
import app from '../app'; // Assuming your Express app instance is exported as 'app'

describe('Spam API Endpoints', () => {
  let authToken;

  beforeAll(async () => {
    // Perform authentication and obtain auth token
    const res = await request(app)
      .post('/user/login')
      .send({
        email: 'user@example.com',
        password: 'password'
      });
    authToken = res.body.token;
  });

  it('should mark a number as spam', async () => {
    const res = await request(app)
      .post('/spam')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        phoneNumber: '1234567890' // Assuming this is the phone number to mark as spam
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Number marked as spam successfully');
  });

  it('should get spam details by phone number', async () => {
    const res = await request(app)
      .get('/spam')
      .query({ phoneNumber: '1234567890' }) // Assuming this is the phone number to get spam details
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('spam');
    // Add more assertions based on your expected response format
  });
});
