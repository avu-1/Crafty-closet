// frontend/src/utils/helpers.js

export const formatPrice = (p) =>
  `₹${parseFloat(p || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const imgSrc = (path) => {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  return path; // Vite proxy serves /uploads/* from backend
};

export const renderStars = (rating) => {
  const r     = parseFloat(rating) || 0;
  const full  = Math.floor(r);
  const half  = r % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

export const catIcon = (cat) => ({
  earrings: '💎', necklaces: '📿', rings: '💍', bracelets: '⌚',
  anklets: '✨', hairclips: '🎀', bangles: '🔮', sets: '🎁',
}[cat] || '💎');

export const statusClass = (s) => ({
  pending:    'badge-pending',
  processing: 'badge-processing',
  shipped:    'badge-shipped',
  delivered:  'badge-delivered',
  cancelled:  'badge-cancelled',
}[s] || 'badge-pending');

export const statusIcon = (s) => ({
  pending: '⏳', processing: '🔄', shipped: '🚚', delivered: '✅', cancelled: '❌',
}[s] || '📦');

export const debounce = (fn, ms) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

// Fallback placeholder SVG (inline)
export const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="#fce4ec" width="400" height="400"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-size="90">💎</text></svg>'
)}`;
