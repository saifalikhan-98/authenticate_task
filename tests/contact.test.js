import request from 'supertest';
import app from '../app'; // Assuming your Express app instance is exported as 'app'

describe('Contact API Endpoints', () => {
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

  it('should add a new contact', async () => {
    const res = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'John Doe',
        phoneNumber: '1234567890',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Contact added successfully');
    expect(res.body).toHaveProperty('contact');
  });

  it('should get all contacts', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('contacts');
    expect(res.body.contacts).toBeInstanceOf(Array);
  });

  it('should search contacts', async () => {
    const res = await request(app)
      .get('/contacts/search')
      .query({ query: 'John' }) // Assuming 'John' is the search query
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('contacts');
    expect(res.body.contacts).toBeInstanceOf(Array);
  });
});
