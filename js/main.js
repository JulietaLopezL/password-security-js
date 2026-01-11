import { generatePassword } from "./generator.js";
import { getPasswordScore, getStrengthLabel } from "./strength.js";

const lengthInput = document.getElementById("lengthInput");
const lowerCheckbox = document.getElementById("lowerCheckbox");
const upperCheckbox = document.getElementById("upperCheckbox");
const numbersCheckbox = document.getElementById("numbersCheckbox");
const symbolsCheckbox = document.getElementById("symbolsCheckbox");
const generateBtn = document.getElementById("generateBtn");
const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const strengthLabel = document.getElementById("strengthLabel");
const strengthFill = document.getElementById("strengthFill");

generateBtn.addEventListener("click", () => {
  try {
    const length = parseInt(lengthInput.value, 10);

    const options = {
      length,
      useLower: lowerCheckbox.checked,
      useUpper: upperCheckbox.checked,
      useNumbers: numbersCheckbox.checked,
      useSymbols: symbolsCheckbox.checked
    };

    const password = generatePassword(options);
    passwordOutput.value = password;

    updateStrength(password);
  } catch (err) {
    alert(err.message);
  }
});

passwordOutput.addEventListener("input", () => {
  updateStrength(passwordOutput.value);
});

copyBtn.addEventListener("click", async () => {
  const value = passwordOutput.value;
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    copyBtn.textContent = "Copiado!";
    setTimeout(() => (copyBtn.textContent = "Copiar"), 1500);
  } catch {
    alert("No se pudo copiar al portapapeles");
  }
});

function updateStrength(password) {
  const score = getPasswordScore(password);
  const label = getStrengthLabel(score);

  strengthLabel.textContent = `${label} (${score}/100)`;
  strengthFill.style.width = `${score}%`;

  if (score < 30) {
    strengthFill.style.background = "#ff4d4d";
  } else if (score < 60) {
    strengthFill.style.background = "#ffb84d";
  } else if (score < 80) {
    strengthFill.style.background = "#6ac96a";
  } else {
    strengthFill.style.background = "#2b9b2b";
  }
}
