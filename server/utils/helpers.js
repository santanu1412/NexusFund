export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const daysUntil = (deadline) => {
  const now = new Date();
  const diff = new Date(deadline) - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};
