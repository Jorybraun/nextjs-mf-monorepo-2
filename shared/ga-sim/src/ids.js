export function generateGaLikeCid() {
  // GA style: randomInt(10 digits).timestampSeconds
  const rand = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit
  const ts = Math.floor(Date.now() / 1000);
  return `${rand}.${ts}`;
}

export function uuid4() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}