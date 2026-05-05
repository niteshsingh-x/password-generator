// --- Secure Password Generator Logic ---
// Encapsulated in DOMContentLoaded to prevent global scope pollution
// Fixes the "niteshsingh is not defined" error pattern

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const copyTooltip = document.getElementById('copyTooltip');
    const lengthRange = document.getElementById('lengthRange');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generateBtn = document.getElementById('generateBtn');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    // Character Sets
    const CHAR_SETS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    // --- Helper Functions ---

    // Secure Random Number Generator
    function getSecureRandomInt(max) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array % max;
    }

    // Calculate Password Strength
    function calculateStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { level: 'Weak', color: 'var(--danger)', width: '25%' };
        if (score <= 3) return { level: 'Medium', color: 'var(--warning)', width: '50%' };
        return { level: 'Strong', color: 'var(--success)', width: '100%' };
    }

    // Generate Password
    function generatePassword() {
        const length = parseInt(lengthRange.value);
        let charset = '';
        let password = '';

        if (includeUppercase.checked) charset += CHAR_SETS.uppercase;
        if (includeLowercase.checked) charset += CHAR_SETS.lowercase;
        if (includeNumbers.checked) charset += CHAR_SETS.numbers;
        if (includeSymbols.checked) charset += CHAR_SETS.symbols;

        // Validation: Ensure at least one character set is selected
        if (charset === '') {
            passwordOutput.textContent = 'Select at least one type!';
            passwordOutput.style.color = 'var(--danger)';
            updateStrength(0);
            return;
        }

        passwordOutput.style.color = 'var(--light)';

        // Generate using crypto
        for (let i = 0; i < length; i++) {
            const randomIndex = getSecureRandomInt(charset.length);
            password += charset[randomIndex];
        }

        passwordOutput.textContent = password;
        updateStrength(calculateStrength(password));
    }

    // Update Strength UI
    function updateStrength(strengthData) {
        strengthFill.style.width = strengthData.width;
        strengthFill.style.backgroundColor = strengthData.color;
        strengthText.textContent = `Strength: ${strengthData.level}`;
        strengthText.style.color = strengthData.color;
    }

    // Copy to Clipboard
    function copyToClipboard() {
        const password = passwordOutput.textContent;
        if (password === 'Click Generate' || password === 'Select at least one type!') return;

        navigator.clipboard.writeText(password).then(() => {
            showTooltip();
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy. Please copy manually.');
        });
    }

    // Show Tooltip
    function showTooltip() {
        copyTooltip.classList.add('show');
        setTimeout(() => {
            copyTooltip.classList.remove('show');
        }, 2000);
    }

    // --- Event Listeners ---

    // Update Length Display
    lengthRange.addEventListener('input', () => {
        lengthValue.textContent = lengthRange.value;
        generatePassword(); // Real-time update
    });

    // Real-time generation on checkbox change
    [includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(cb => {
        cb.addEventListener('change', generatePassword);
    });

    // Generate Button
    generateBtn.addEventListener('click', generatePassword);

    // Copy Button
    copyBtn.addEventListener('click', copyToClipboard);

    // Initial Generation 
    generatePassword();
});