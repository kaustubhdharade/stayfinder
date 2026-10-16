/**
 * Format uptime seconds into human-readable string
 * @param {number} seconds
 * @returns {string}
 */
export function formatUptime(seconds) {
  if (!seconds || isNaN(seconds)) return '0s';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0 || hrs > 0) parts.push(`${mins}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
}

/**
 * Format ISO date string into readable format
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDateTime(dateStr) {
  if (!dateStr) return 'N/A';
  try {
    return new Date(dateStr).toLocaleString();
  } catch {
    return dateStr;
  }
}
