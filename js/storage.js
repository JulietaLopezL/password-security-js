const key = "password_history";

import { getPasswordScore, getStrengthLabel } from "./strength.js";

export function savePassword(password) {
    const history = getHistory();
    history.push({ 
        password,
        date: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(history));

    return history;
}

export function getHistory() {
    const raw =  localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];     
}

export async function copyToClipboard(value) {
    await navigator.clipboard.writeText(value);
}

export function clearHistory() {
    localStorage.removeItem(key);
}

export function getStatistics() {
    const history = getHistory();
    const totalPasswords = history.length;
    
    if (totalPasswords === 0) {
        return {
            totalPasswords: 0,
            totalLength: 0,
            totalScore: 0,
            strengthCounts: {}
        };
    }
    
    const totalLength = history.reduce((sum, entry) => sum + entry.password.length, 0);
    const totalScore = history.reduce((sum, entry) => sum + getPasswordScore(entry.password), 0);
    
    const strengthCounts = {};
    history.forEach(entry => {
        const label = getStrengthLabel(getPasswordScore(entry.password));
        strengthCounts[label] = (strengthCounts[label] || 0) + 1;
    });
    
    return {
        totalPasswords,
        totalLength,
        totalScore,
        strengthCounts
    };
}
