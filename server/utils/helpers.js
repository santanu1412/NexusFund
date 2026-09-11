/**
 * Wrap an async route handler to catch errors and pass them to Express error middleware.
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Create a custom API error with a status code.
 */
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Calculate days remaining until a deadline date.
 */
export const daysUntil = (deadline) => {
  const now = new Date();
  const diff = new Date(deadline) - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};
