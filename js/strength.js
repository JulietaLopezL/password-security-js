export function getPasswordScore(password) {
  if (!password) return 0;

  let score = 0;
  const length = password.length;

  if (length >= 8) score += 20;
  if (length >= 12) score += 20;
  if (length >= 16) score += 10;

  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^a-zA-Z0-9]/.test(password)) score += 20;

 
  if (hasRepeatingPatterns(password)) {
    score -= 10;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return score;
}

export function getStrengthLabel(score) {
  if (score < 30) return "😞 Muy débil";
  if (score < 60) return "😐 Mejorable";
  if (score < 80) return "😉 Fuerte";
  return "😎 Muy fuerte";
}

function hasRepeatingPatterns(password) {
  const counts = {};
  for (const ch of password) {
    counts[ch] = (counts[ch] || 0) + 1;
  }
  const max = Math.max(...Object.values(counts));
  return max >= password.length / 2;
}