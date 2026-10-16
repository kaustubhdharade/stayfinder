import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('StayFinder API Baseline Endpoints', () => {
  it('GET /api/health should return 200 and operational health status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('service', 'StayFinder API');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('environment');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
    expect(typeof response.body.uptime).toBe('number');
  });

  it('GET / should return 200 and service metadata', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'StayFinder API');
    expect(response.body).toHaveProperty('documentation', '/api/health');
  });

  it('GET /api/non-existent-route should return structured 404 error', async () => {
    const response = await request(app).get('/api/non-existent-route');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      error: {
        message: 'Resource not found: GET /api/non-existent-route',
        status: 404,
      },
    });
  });

  it('should include CORS headers in responses', async () => {
    const response = await request(app)
      .get('/api/health')
      .set('Origin', 'http://localhost:5173');

    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });
});
