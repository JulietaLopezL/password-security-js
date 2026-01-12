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
const lengthMessage = document.getElementById("lengthMessage");
const optionsMessage = document.getElementById("optionsMessage");

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

    if(password){
      copyBtn.disabled = false;
    } else{
      copyBtn.disabled = true;
    }

    updateStrength(password);
  } catch (err) {
    errorMessage(err.message);
  }
});

copyBtn.disabled = !passwordOutput.value;

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
    errorMessage("Error al copiar al portapapeles");
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

lengthInput.addEventListener("input", () => {
  const length = parseInt(lengthInput.value, 10);
  if (length < 6) {
    lengthMessage.textContent = "La longitud mínima es 6";
  } else if (length > 20) {
    lengthMessage.textContent = "La longitud máxima es 20";
  } else {
    lengthMessage.textContent = "";
  }
});

const checkboxes = [lowerCheckbox, upperCheckbox, numbersCheckbox, symbolsCheckbox];
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const anyChecked = checkboxes.some(cb => cb.checked);
    if (!anyChecked) {
      optionsMessage.textContent = "Debes seleccionar al menos un tipo de carácter";
    } else {
      optionsMessage.textContent = "";
    }
  });
});

function errorMessage(message) {
    const messageDiv = document.getElementById("Message");
    if (message === null) {
        messageDiv.textContent = "";
        messageDiv.style.display = "none";
    } else {
        messageDiv.textContent = message;
        messageDiv.style.display = "block";
        setTimeout(() => {
            messageDiv.textContent = "";
            messageDiv.style.display = "none";
        }, 3000);
    }
}
