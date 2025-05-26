import rateLimit from 'express-rate-limit';

const message = 'Too many requests, please try again later';
// Limiter general para todas las rutas
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 requests por windowMs
  message: {
    message
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter específico para el endpoint de fetch
export const fetchLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 2, // Límite de 2 requests por hora
  message: {
    message
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para búsquedas
export const searchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 30, // Límite de 30 búsquedas por 5 minutos
  message: {
    message
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter para delete
export const deleteLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // cada 30 minutos
  max: 2, // Límite de 2 deletes por 30 minutos
  message: {
    message
  },
  standardHeaders: true,
  legacyHeaders: false,
});