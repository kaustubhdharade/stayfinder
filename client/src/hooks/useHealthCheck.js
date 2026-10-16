import { useState, useEffect, useCallback } from 'react';
import { checkServerHealth } from '../services/api';

export function useHealthCheck(pollIntervalMs = 0) {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await checkServerHealth();
      setHealth(data);
    } catch (err) {
      setError(err.message || 'Unable to reach backend server');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();

    if (pollIntervalMs > 0) {
      const interval = setInterval(fetchHealth, pollIntervalMs);
      return () => clearInterval(interval);
    }
  }, [fetchHealth, pollIntervalMs]);

  return { health, loading, error, refetch: fetchHealth };
}
