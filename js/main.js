import { generatePassword } from "./generator.js";
import { getPasswordScore, getStrengthLabel } from "./strength.js";
import { savePassword, getHistory, clearHistory, getStatistics } from "./storage.js";


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
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const historyGeneratorBtn = document.getElementById("historyGeneratorBtn");
const profileSelector = document.getElementById("profileSelector");
const customOptions = document.getElementById("customOptions");
const recommendedOptions = document.getElementById("recommendedOptions");
const simpleOptions = document.getElementById("simpleOptions");
const strongOptions = document.getElementById("strongOptions");


historyGeneratorBtn.disabled = getHistory().length === 0;

generateBtn.addEventListener("click", () => {

  if(!lengthInput.value.trim()){
    errorMessage("Debes ingresar la longitud de la contraseña");
    return;
  }
  
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

    const savePasswordResult = savePassword(password); 

    historyGeneratorBtn.disabled = false;

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

function loadHistory() {
  const history = getHistory();
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.password} (Generada el: ${new Date(entry.date).toLocaleString()})`;
    historyList.appendChild(li);
  });
}

function displayStatistics() {
  const stats = getStatistics();
  const summaryDiv = document.getElementById("usageSummary");
  if (stats.totalPasswords === 0) {
    summaryDiv.innerHTML = "<p>No hay estadísticas disponibles.</p>";
    return;
  }
  const strengthText = Object.entries(stats.strengthCounts)
    .map(([label, count]) => `${label}: ${count}`)
    .join(", ");
  summaryDiv.innerHTML = `
    <p><strong>Resumen de uso:</strong></p>
    <p>Total de contraseñas: ${stats.totalPasswords}</p>
    <p>Suma de longitudes: ${stats.totalLength}</p>
    <p>Suma de scores: ${stats.totalScore}</p>
    <p>Contadores por fuerza: ${strengthText}</p>
  `;
}

historyGeneratorBtn.addEventListener("click", () => {
  loadHistory();
  displayStatistics();

  document.querySelector('.history h2').style.display = 'block';
  document.getElementById('historyList').style.display = 'block';
  document.getElementById('cleanHistory').style.display = 'block';
  document.getElementById('usageSummary').style.display = 'block';
});

clearHistoryBtn.addEventListener("click", () => {
  clearHistory();
  loadHistory();
  displayStatistics();
 
  document.querySelector('.history h2').style.display = 'none';
  document.getElementById('historyList').style.display = 'none';
  document.getElementById('cleanHistory').style.display = 'none';
  document.getElementById('usageSummary').style.display = 'none';

  historyGeneratorBtn.disabled = historyList.children.length === 0;
});

const PASSWORD_PROFILES = { 
  simple: { length: 8, useLower: true, useUpper: false, useNumbers: true, useSymbols: false },
  recommended: { length: 12, useLower: true, useUpper: true, useNumbers: true, useSymbols: false },
  strong: { length: 16, useLower: true, useUpper: true, useNumbers: true, useSymbols: true },
  custom: null
};

profileSelector.addEventListener("change", () => {
  const selectedProfile = profileSelector.value;
  const configs = PASSWORD_PROFILES[selectedProfile];
  if (configs) {
    lengthInput.value = configs.length;
    lowerCheckbox.checked = configs.useLower;
    upperCheckbox.checked = configs.useUpper;
    numbersCheckbox.checked = configs.useNumbers;
    symbolsCheckbox.checked = configs.useSymbols;
    customOptions.style.display = "none";
  } else {
    customOptions.style.display = "block";
  }
});
