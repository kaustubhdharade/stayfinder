import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkServerHealth } from '../api';

describe('client api service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches health check successfully', async () => {
    const mockResponse = {
      status: 'ok',
      service: 'StayFinder API',
      timestamp: new Date().toISOString(),
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await checkServerHealth();
    expect(result.status).toBe('ok');
    expect(result.service).toBe('StayFinder API');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/health$/),
      expect.any(Object)
    );
  });

  it('throws structured error on failed request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server Internal Error' }),
    });

    await expect(checkServerHealth()).rejects.toThrow('Server Internal Error');
  });
});
