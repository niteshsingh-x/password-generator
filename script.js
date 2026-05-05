document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordOutput = document.getElementById('passwordOutput');
    const lengthRange = document.getElementById('lengthRange');
    const lengthValue = document.getElementById('lengthValue');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    // Checkboxes
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const avoidConfusing = document.getElementById('avoidConfusing');

    // Character Sets
    const chars = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        // Characters to avoid if "Avoid Confusing" is checked
        confusing: {
            uppercase: 'IO',       // Looks like 1 and 0
            lowercase: 'l',        // Looks like I and 1
            numbers: '01',         // Looks like O and l
            symbols: '|()[]'       // Can look similar in some fonts
        }
    };

    // Initialize
    generatePassword();
    
    // Event Listeners
    lengthRange.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
        generatePassword();
    });

    [includeUppercase, includeLowercase, includeNumbers, includeSymbols, avoidConfusing].forEach(el => {
        el.addEventListener('change', generatePassword);
    });

    generateBtn.addEventListener('click', generatePassword);

    copyBtn.addEventListener('click', copyToClipboard);

    // --- Core Functions ---

    function getAvailableChars() {
        let availableChars = '';

        if (includeUppercase.checked) {
            let pool = chars.uppercase;
            if (avoidConfusing.checked) {
                pool = pool.replace(new RegExp(`[${chars.confusing.uppercase}]`, 'g'), '');
            }
            availableChars += pool;
        }

        if (includeLowercase.checked) {
            let pool = chars.lowercase;
            if (avoidConfusing.checked) {
                pool = pool.replace(new RegExp(`[${chars.confusing.lowercase}]`, 'g'), '');
            }
            availableChars += pool;
        }

        if (includeNumbers.checked) {
            let pool = chars.numbers;
            if (avoidConfusing.checked) {
                pool = pool.replace(new RegExp(`[${chars.confusing.numbers}]`, 'g'), '');
            }
            availableChars += pool;
        }

        if (includeSymbols.checked) {
            let pool = chars.symbols;
            if (avoidConfusing.checked) {
                pool = pool.replace(new RegExp(`[${chars.confusing.symbols}]`, 'g'), '');
            }
            availableChars += pool;
        }

        return availableChars;
    }

    function generatePassword() {
        const length = parseInt(lengthRange.value);
        const charPool = getAvailableChars();

        if (charPool.length === 0) {
            passwordOutput.value = "Select at least one option";
            updateStrength(0);
            return;
        }

        let password = '';
        // Use crypto.getRandomValues for true randomness
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            password += charPool[randomValues[i] % charPool.length];
        }

        passwordOutput.value = password;
        calculateStrength(password);
    }

    function calculateStrength(password) {
        let score = 0;
        const length = password.length;

        if (length >= 8) score += 1;
        if (length >= 12) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        updateStrength(score);
    }

    function updateStrength(score) {
        let width, color, text;

        if (score <= 2) {
            width = '33%';
            color = 'var(--weak-color)';
            text = 'Weak';
        } else if (score <= 4) {
            width = '66%';
            color = 'var(--medium-color)';
            text = 'Medium';
        } else {
            width = '100%';
            color = 'var(--strong-color)';
            text = 'Strong';
        }

        strengthFill.style.width = width;
        strengthFill.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

        function copyToClipboard() {
        const password = passwordOutput.value;
        if (!password || password === "Select at least one option") return;

        // Use the Clipboard API
        navigator.clipboard.writeText(password).then(() => {
            // Visual Feedback
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            passwordOutput.select();
            document.execCommand('copy');
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    }
}); // End of DOMContentLoaded