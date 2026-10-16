/**
 * 404 Not Found Middleware for unknown routes
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      message: `Resource not found: ${req.method} ${req.originalUrl}`,
      status: 404,
    },
  });
}
