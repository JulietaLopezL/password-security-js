const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_-+=[]{};:,.<>?";

export function generatePassword(options) {
  const { length, useLower, useUpper, useNumbers, useSymbols } = options;

    let pool = "";
    if (useLower) pool += LOWER;
    if (useUpper) pool += UPPER;
    if (useNumbers) pool += NUMBERS;
    if (useSymbols) pool += SYMBOLS;

    if (!pool) {
        throw new Error("Debes seleccionar al menos un tipo de carácter");
    }

    if (length < 6){
        throw new Error("La longitud debe ser mayor a 6");
    }

    if(length > 20){
        throw new Error("La longitud debe ser menor o igual a 20");
    }

    let password = "";

    const requiredChars = [];
    if (useLower) requiredChars.push(getRandomChar(LOWER));
    if (useUpper) requiredChars.push(getRandomChar(UPPER));
    if (useNumbers) requiredChars.push(getRandomChar(NUMBERS));
    if (useSymbols) requiredChars.push(getRandomChar(SYMBOLS));

    password += requiredChars.join("");

    for (let i = password.length; i < length; i++) {
        password += getRandomChar(pool);
    }

    return shuffleString(password);
}

function getRandomChar(str) {
  const index = Math.floor(Math.random() * str.length);
  return str[index];
}

function shuffleString(str) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}