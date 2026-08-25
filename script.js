document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tempInput = document.getElementById('temp-input');
    const unitSelect = document.getElementById('unit-select');
    const inputUnitSymbol = document.getElementById('input-unit-symbol');
    const errorBox = document.getElementById('error-box');
    const errorText = document.getElementById('error-text');
    const convertBtn = document.getElementById('convert-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Result Cards Output Displays
    const resCelsius = document.getElementById('res-celsius');
    const resFahrenheit = document.getElementById('res-fahrenheit');
    const resKelvin = document.getElementById('res-kelvin');

    const cardCelsius = document.getElementById('card-celsius');
    const cardFahrenheit = document.getElementById('card-fahrenheit');
    const cardKelvin = document.getElementById('card-kelvin');

    const presetChips = document.querySelectorAll('.chip');
    const copyBtns = document.querySelectorAll('.copy-btn');

    // Absolute Zero Limits
    const ABSOLUTE_ZERO = {
        celsius: -273.15,
        fahrenheit: -459.67,
        kelvin: 0
    };

    const UNIT_SYMBOLS = {
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K'
    };

    /**
     * Format numbers cleanly up to 2 decimal places, removing unnecessary trailing zeros.
     */
    function formatNumber(num) {
        if (Object.is(num, -0)) num = 0;
        const rounded = Math.round(num * 100) / 100;
        return rounded.toString();
    }

    /**
     * Update unit badge & highlight source unit card
     */
    function updateUnitSymbol() {
        const selectedUnit = unitSelect.value;
        inputUnitSymbol.textContent = UNIT_SYMBOLS[selectedUnit];

        cardCelsius.classList.toggle('source-active', selectedUnit === 'celsius');
        cardFahrenheit.classList.toggle('source-active', selectedUnit === 'fahrenheit');
        cardKelvin.classList.toggle('source-active', selectedUnit === 'kelvin');
    }

    /**
     * Show validation error message
     */
    function showError(message) {
        errorText.textContent = message;
        errorBox.classList.remove('hidden');
        tempInput.classList.add('has-error');
        clearResults();
    }

    /**
     * Clear validation error state
     */
    function clearError() {
        errorBox.classList.add('hidden');
        tempInput.classList.remove('has-error');
    }

    /**
     * Clear result values
     */
    function clearResults() {
        resCelsius.textContent = '--';
        resFahrenheit.textContent = '--';
        resKelvin.textContent = '--';
    }

    /**
     * Primary Validation and Temperature Conversion Math
     */
    function processConversion(silentEmpty = false) {
        const rawValue = tempInput.value.trim();

        // Handle empty input
        if (rawValue === '') {
            if (!silentEmpty) {
                showError('Please enter a temperature value to convert.');
            } else {
                clearError();
                clearResults();
            }
            return;
        }

        const numValue = Number(rawValue);

        // Reject non-numeric input (letters, special characters, multiple decimal points)
        if (isNaN(numValue) || !/^-?\d*\.?\d+$/.test(rawValue)) {
            showError(`"${rawValue}" is not a valid number. Please enter numeric digits only (e.g. 25, -10.5).`);
            return;
        }

        const selectedUnit = unitSelect.value;
        const limit = ABSOLUTE_ZERO[selectedUnit];

        // Edge case check: Absolute zero violation
        if (numValue < limit) {
            const limitStr = `${limit}${UNIT_SYMBOLS[selectedUnit]}`;
            showError(`Absolute Zero Violation: Temperature cannot be below absolute zero (${limitStr}).`);
            return;
        }

        clearError();

        // Conversion Formulas
        let celsius, fahrenheit, kelvin;

        switch (selectedUnit) {
            case 'celsius':
                celsius = numValue;
                fahrenheit = (numValue * 9 / 5) + 32;
                kelvin = numValue + 273.15;
                break;

            case 'fahrenheit':
                celsius = (numValue - 32) * 5 / 9;
                fahrenheit = numValue;
                kelvin = celsius + 273.15;
                break;

            case 'kelvin':
                kelvin = numValue;
                celsius = numValue - 273.15;
                fahrenheit = (celsius * 9 / 5) + 32;
                break;
        }

        // Display converted values simultaneously with correct unit labels
        resCelsius.textContent = `${formatNumber(celsius)} °C`;
        resFahrenheit.textContent = `${formatNumber(fahrenheit)} °F`;
        resKelvin.textContent = `${formatNumber(kelvin)} K`;
    }

    // Event Listeners

    // Convert button click
    convertBtn.addEventListener('click', () => {
        processConversion(false);
    });

    // Real-time input typing
    tempInput.addEventListener('input', () => {
        processConversion(true);
    });

    // Unit dropdown change
    unitSelect.addEventListener('change', () => {
        updateUnitSymbol();
        if (tempInput.value.trim() !== '') {
            processConversion(false);
        }
    });

    // Enter key press inside input field
    tempInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processConversion(false);
        }
    });

    // Clear / Reset button
    resetBtn.addEventListener('click', () => {
        tempInput.value = '';
        unitSelect.value = 'celsius';
        clearError();
        clearResults();
        updateUnitSymbol();
        tempInput.focus();
    });

    // Quick Preset Chips
    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const val = chip.getAttribute('data-val');
            const unit = chip.getAttribute('data-unit');
            tempInput.value = val;
            unitSelect.value = unit;
            updateUnitSymbol();
            processConversion(false);
        });
    });

    // Copy to Clipboard
    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetId = btn.getAttribute('data-target');
            const targetElem = document.getElementById(targetId);
            const textToCopy = targetElem ? targetElem.textContent.trim() : '';

            if (textToCopy && textToCopy !== '--') {
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    const originalText = btn.querySelector('span').textContent;
                    btn.classList.add('copied');
                    btn.querySelector('span').textContent = 'Copied!';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.querySelector('span').textContent = originalText;
                    }, 1200);
                } catch (err) {
                    console.error('Clipboard copy failed:', err);
                }
            }
        });
    });

    // Initial setup
    updateUnitSymbol();
});
