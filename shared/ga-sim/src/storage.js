const MEM = new Map();

export function getItem(key) {
  try {
    if (typeof localStorage === 'undefined') return MEM.get(key) || null;
    return localStorage.getItem(key);
  } catch {
    return MEM.get(key) || null;
  }
}

export function setItem(key, value) {
  try {
    if (typeof localStorage === 'undefined') MEM.set(key, value); else localStorage.setItem(key, value);
  } catch { MEM.set(key, value); }
}

export function removeItem(key) {
  try {
    if (typeof localStorage === 'undefined') MEM.delete(key); else localStorage.removeItem(key);
  } catch { MEM.delete(key); }
}