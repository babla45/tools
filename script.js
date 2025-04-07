// List of available tools
const tools = [
    "prime check",
    "leap year check",
    "prime factorization",
    "divisors of a number",
    "sum of digits",
    "sum of squares",
    "sum of cubes",
    "sum of array",
    "fibonacci series",
    "palindrome check",
    "armstrong number",
    "perfect number",
    "factorial",
    "gcd of array of number",
    "lcm of array of number",
    "nth fibonacci number",
    "sort array ascending",
    "sort array descending",
    "reverse string",
    "reverse array",
    "reverse array of strings",
    "sort array of strings"
];

// Remove duplicates from the list
const uniqueTools = [...new Set(tools)];

// DOM Elements
const toolSelect = document.getElementById('toolSelect');
const toolSearch = document.getElementById('toolSearch');
const inputArea = document.getElementById('inputArea');
const resultArea = document.getElementById('resultArea');
const resultDisplay = document.getElementById('result');

// Initialize the page
document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
    // Populate dropdown with tools
    populateToolDropdown(uniqueTools);
    
    // Add search type toggle
    createSearchTypeToggle();
    
    // Set up event listeners
    toolSearch.addEventListener('input', filterTools);
    toolSearch.addEventListener('focus', filterTools); // Show dropdown on focus
    toolSelect.addEventListener('change', function() {
        hideCustomDropdown();
        updateInputArea();
    });
}

// Create search type toggle controls
function createSearchTypeToggle() {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'search-toggle';
    toggleContainer.style.display = 'flex';
    toggleContainer.style.marginTop = '5px';
    toggleContainer.style.fontSize = '14px';
    
    // Create radio buttons for search type
    const subsequenceLabel = document.createElement('label');
    subsequenceLabel.style.marginRight = '15px';
    subsequenceLabel.style.display = 'flex';
    subsequenceLabel.style.alignItems = 'center';
    
    const subsequenceRadio = document.createElement('input');
    subsequenceRadio.type = 'radio';
    subsequenceRadio.name = 'searchType';
    subsequenceRadio.value = 'subsequence';
    subsequenceRadio.id = 'subsequenceSearch';
    subsequenceRadio.checked = true; // Default
    subsequenceRadio.style.marginRight = '5px';
    
    subsequenceLabel.appendChild(subsequenceRadio);
    subsequenceLabel.appendChild(document.createTextNode('Subsequence Search'));
    
    const substringLabel = document.createElement('label');
    substringLabel.style.display = 'flex';
    substringLabel.style.alignItems = 'center';
    
    const substringRadio = document.createElement('input');
    substringRadio.type = 'radio';
    substringRadio.name = 'searchType';
    substringRadio.value = 'substring';
    substringRadio.id = 'substringSearch';
    substringRadio.style.marginRight = '5px';
    
    substringLabel.appendChild(substringRadio);
    substringLabel.appendChild(document.createTextNode('Substring Search'));
    
    toggleContainer.appendChild(subsequenceLabel);
    toggleContainer.appendChild(substringLabel);
    
    // Add toggle after search input
    toolSearch.parentNode.insertBefore(toggleContainer, toolSearch.nextSibling);
    
    // Add event listeners for radio buttons
    subsequenceRadio.addEventListener('change', filterTools);
    substringRadio.addEventListener('change', filterTools);
}

// Populate the dropdown with tools
function populateToolDropdown(toolsList) {
    toolSelect.innerHTML = '<option value="" disabled selected>Select a tool</option>';
    
    toolsList.forEach(tool => {
        const option = document.createElement('option');
        option.value = tool;
        option.textContent = tool.charAt(0).toUpperCase() + tool.slice(1);
        toolSelect.appendChild(option);
    });
}

// Filter tools based on search input and search type
function filterTools() {
    const searchTerm = toolSearch.value.toLowerCase();
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    
    if (searchTerm === '') {
        populateToolDropdown(uniqueTools);
        // Hide custom dropdown when search is cleared
        hideCustomDropdown();
        return;
    }
    
    const filteredTools = uniqueTools.filter(tool => {
        if (searchType === 'subsequence') {
            // Use subsequence matching
            return isSubsequence(searchTerm, tool.toLowerCase());
        } else {
            // Use substring matching
            return tool.toLowerCase().includes(searchTerm);
        }
    });
    
    // Populate with filtered tools
    populateToolDropdown(filteredTools);
    
    // Show custom dropdown with search results
    showCustomDropdown(filteredTools);
}

// Create and show custom dropdown
function showCustomDropdown(toolsList) {
    // Remove existing custom dropdown if any
    let existingDropdown = document.getElementById('customDropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }
    
    // Create custom dropdown
    const customDropdown = document.createElement('div');
    customDropdown.id = 'customDropdown';
    customDropdown.style.position = 'absolute';
    customDropdown.style.width = toolSelect.offsetWidth + 'px';
    customDropdown.style.maxHeight = '200px';
    customDropdown.style.overflowY = 'auto';
    customDropdown.style.border = '1px solid #ddd';
    customDropdown.style.borderRadius = '4px';
    customDropdown.style.backgroundColor = 'white';
    customDropdown.style.zIndex = '1000';
    customDropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Position dropdown below the search input
    const rect = toolSearch.getBoundingClientRect();
    customDropdown.style.top = (rect.bottom + window.scrollY) + 'px';
    customDropdown.style.left = (rect.left + window.scrollX) + 'px';
    
    // Add options to custom dropdown
    toolsList.forEach(tool => {
        const option = document.createElement('div');
        option.textContent = tool.charAt(0).toUpperCase() + tool.slice(1);
        option.style.padding = '8px 12px';
        option.style.cursor = 'pointer';
        option.style.borderBottom = '1px solid #eee';
        
        // Highlight on hover
        option.onmouseover = function() {
            this.style.backgroundColor = '#f0f0f0';
        };
        option.onmouseout = function() {
            this.style.backgroundColor = 'white';
        };
        
        // Select on click
        option.onclick = function() {
            toolSelect.value = tool;
            hideCustomDropdown();
            updateInputArea();
        };
        
        customDropdown.appendChild(option);
    });
    
    // No results message
    if (toolsList.length === 0) {
        const noResults = document.createElement('div');
        noResults.textContent = 'No matching tools found';
        noResults.style.padding = '8px 12px';
        noResults.style.fontStyle = 'italic';
        noResults.style.color = '#888';
        customDropdown.appendChild(noResults);
    }
    
    // Add custom dropdown to document
    document.body.appendChild(customDropdown);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target !== toolSearch && event.target !== customDropdown) {
            hideCustomDropdown();
        }
    });
}

// Hide custom dropdown
function hideCustomDropdown() {
    const customDropdown = document.getElementById('customDropdown');
    if (customDropdown) {
        customDropdown.remove();
    }
}

// Check if string s is a subsequence of string t
function isSubsequence(s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }
    return i === s.length;
}

// Update input area based on selected tool
function updateInputArea() {
    const selectedTool = toolSelect.value;
    
    if (!selectedTool) {
        inputArea.innerHTML = '<p>Select a tool from the dropdown to get started</p>';
        return;
    }
    
    // Clear result
    resultDisplay.textContent = '';
    
    // Set up appropriate input fields based on selected tool
    switch(selectedTool) {
        case "prime check":
            inputArea.innerHTML = `
                <label for="numberInput">Enter a number:</label>
                <input type="number" id="numberInput" placeholder="Enter a number">
            `;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "leap year check":
            inputArea.innerHTML = `
                <label for="yearInput">Enter a year:</label>
                <input type="number" id="yearInput" placeholder="Enter a year">
            `;
            document.getElementById('yearInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "prime factorization":
        case "divisors of a number":
        case "sum of digits":
        case "perfect number":
        case "factorial":
        case "armstrong number":
            inputArea.innerHTML = `
                <label for="numberInput">Enter a number:</label>
                <input type="number" id="numberInput" placeholder="Enter a number">
            `;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "sum of squares":
        case "sum of cubes":
            inputArea.innerHTML = `
                <label for="numberInput">Enter the limit (n):</label>
                <input type="number" id="numberInput" placeholder="Enter a number">
            `;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "sum of array":
        case "gcd of array of number":
        case "lcm of array of number":
        case "sort array ascending":
        case "sort array descending":
        case "reverse array":
            inputArea.innerHTML = `
                <label for="arrayInput">Enter numbers separated by commas:</label>
                <input type="text" id="arrayInput" placeholder="e.g., 5,10,15,20">
            `;
            document.getElementById('arrayInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "fibonacci series":
            inputArea.innerHTML = `
                <label for="numberInput">Enter the number of terms:</label>
                <input type="number" id="numberInput" placeholder="Enter a number">
            `;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "nth fibonacci number":
            inputArea.innerHTML = `
                <label for="numberInput">Enter the position (n):</label>
                <input type="number" id="numberInput" placeholder="Enter a number">
            `;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "palindrome check":
        case "reverse string":
            inputArea.innerHTML = `
                <label for="textInput">Enter text:</label>
                <input type="text" id="textInput" placeholder="Enter text">
            `;
            document.getElementById('textInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "reverse array of strings":
        case "sort array of strings":
            inputArea.innerHTML = `
                <label for="arrayInput">Enter strings separated by commas:</label>
                <input type="text" id="arrayInput" placeholder="e.g., apple,banana,cherry">
            `;
            document.getElementById('arrayInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        default:
            inputArea.innerHTML = '<p>Tool not implemented yet</p>';
    }
}

// Calculate and display result
function calculateResult(tool) {
    let result;
    
    switch(tool) {
        case "prime check":
            const num = parseInt(document.getElementById('numberInput').value);
            result = isPrime(num) ? `${num} is a prime number.` : `${num} is not a prime number.`;
            break;
        case "leap year check":
            const year = parseInt(document.getElementById('yearInput').value);
            result = isLeapYear(year) ? `${year} is a leap year.` : `${year} is not a leap year.`;
            break;
        case "prime factorization":
            const n = parseInt(document.getElementById('numberInput').value);
            result = `Prime factorization of ${n}: ${primeFactorization(n).join(' × ')}`;
            break;
        case "divisors of a number":
            const number = parseInt(document.getElementById('numberInput').value);
            result = `Divisors of ${number}: ${getDivisors(number).join(', ')}`;
            break;
        case "sum of digits":
            const numForDigits = document.getElementById('numberInput').value;
            result = `Sum of digits of ${numForDigits}: ${sumOfDigits(numForDigits)}`;
            break;
        case "sum of squares":
            const limit = parseInt(document.getElementById('numberInput').value);
            result = `Sum of squares from 1 to ${limit}: ${sumOfSquares(limit)}`;
            break;
        case "sum of cubes":
            const limitForCubes = parseInt(document.getElementById('numberInput').value);
            result = `Sum of cubes from 1 to ${limitForCubes}: ${sumOfCubes(limitForCubes)}`;
            break;
        case "sum of array":
            const arrayForSum = document.getElementById('arrayInput').value.split(',').map(Number);
            result = `Sum of array [${arrayForSum.join(', ')}]: ${sumOfArray(arrayForSum)}`;
            break;
        case "fibonacci series":
            const terms = parseInt(document.getElementById('numberInput').value);
            result = `Fibonacci series (${terms} terms): ${fibonacciSeries(terms).join(', ')}`;
            break;
        case "palindrome check":
            const text = document.getElementById('textInput').value;
            result = isPalindrome(text) ? `"${text}" is a palindrome.` : `"${text}" is not a palindrome.`;
            break;
        case "armstrong number":
            const armstrongNum = parseInt(document.getElementById('numberInput').value);
            result = isArmstrong(armstrongNum) ? `${armstrongNum} is an Armstrong number.` : `${armstrongNum} is not an Armstrong number.`;
            break;
        case "perfect number":
            const perfectNum = parseInt(document.getElementById('numberInput').value);
            result = isPerfect(perfectNum) ? `${perfectNum} is a perfect number.` : `${perfectNum} is not a perfect number.`;
            break;
        case "factorial":
            const factNum = parseInt(document.getElementById('numberInput').value);
            result = `Factorial of ${factNum}: ${factorial(factNum)}`;
            break;
        case "gcd of array of number":
            const arrayForGcd = document.getElementById('arrayInput').value.split(',').map(Number);
            result = `GCD of [${arrayForGcd.join(', ')}]: ${gcdOfArray(arrayForGcd)}`;
            break;
        case "lcm of array of number":
            const arrayForLcm = document.getElementById('arrayInput').value.split(',').map(Number);
            result = `LCM of [${arrayForLcm.join(', ')}]: ${lcmOfArray(arrayForLcm)}`;
            break;
        case "nth fibonacci number":
            const position = parseInt(document.getElementById('numberInput').value);
            result = `The ${position}${getOrdinalSuffix(position)} Fibonacci number is: ${nthFibonacci(position)}`;
            break;
        case "sort array ascending":
            const arrayForAscSort = document.getElementById('arrayInput').value.split(',').map(Number);
            result = `Sorted array (ascending): [${sortArrayAscending(arrayForAscSort).join(', ')}]`;
            break;
        case "sort array descending":
            const arrayForDescSort = document.getElementById('arrayInput').value.split(',').map(Number);
            result = `Sorted array (descending): [${sortArrayDescending(arrayForDescSort).join(', ')}]`;
            break;
        case "reverse string":
            const stringToReverse = document.getElementById('textInput').value;
            result = `Reversed string: ${reverseString(stringToReverse)}`;
            break;
        case "reverse array":
            const arrayToReverse = document.getElementById('arrayInput').value.split(',').map(Number);
            result = `Reversed array: [${reverseArray(arrayToReverse).join(', ')}]`;
            break;
        case "reverse array of strings":
            const stringArrayToReverse = document.getElementById('arrayInput').value.split(',');
            result = `Reversed array of strings: [${reverseArrayOfStrings(stringArrayToReverse).join(', ')}]`;
            break;
        case "sort array of strings":
            const stringArrayToSort = document.getElementById('arrayInput').value.split(',');
            result = `Sorted array of strings: [${sortArrayOfStrings(stringArrayToSort).join(', ')}]`;
            break;
        default:
            result = "Tool not implemented yet";
    }
    
    resultDisplay.textContent = result;
}

// Function implementations
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function primeFactorization(n) {
    const factors = [];
    let divisor = 2;
    
    while (n > 1) {
        while (n % divisor === 0) {
            factors.push(divisor);
            n /= divisor;
        }
        divisor++;
        
        if (divisor * divisor > n && n > 1) {
            factors.push(n);
            break;
        }
    }
    
    return factors;
}

function getDivisors(n) {
    const divisors = [];
    
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i !== n / i) {
                divisors.push(n / i);
            }
        }
    }
    
    return divisors.sort((a, b) => a - b);
}

function sumOfDigits(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

function sumOfSquares(n) {
    return (n * (n + 1) * (2 * n + 1)) / 6;
}

function sumOfCubes(n) {
    const sum = Math.pow((n * (n + 1)) / 2, 2);
    return sum;
}

function sumOfArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

function fibonacciSeries(n) {
    const series = [0, 1];
    
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    
    return series;
}

function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

function isArmstrong(num) {
    const digits = num.toString().split('');
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
    
    return sum === num;
}

function isPerfect(num) {
    if (num <= 1) return false;
    
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) {
                sum += num / i;
            }
        }
    }
    
    return sum === num;
}

function factorial(n) {
    if (n < 0) return "Undefined (negative input)";
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

function gcd(a, b) {
    while (b) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function gcdOfArray(arr) {
    return arr.reduce((a, b) => gcd(a, b));
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function lcmOfArray(arr) {
    return arr.reduce((a, b) => lcm(a, b));
}

function nthFibonacci(n) {
    if (n <= 0) return "Undefined (non-positive input)";
    if (n === 1) return 0;
    if (n === 2) return 1;
    
    let a = 0, b = 1;
    for (let i = 3; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    
    return b;
}

function sortArrayAscending(arr) {
    return [...arr].sort((a, b) => a - b);
}

function sortArrayDescending(arr) {
    return [...arr].sort((a, b) => b - a);
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function reverseArray(arr) {
    return [...arr].reverse();
}

function reverseArrayOfStrings(arr) {
    return [...arr].reverse();
}

function sortArrayOfStrings(arr) {
    return [...arr].sort();
}

function getOrdinalSuffix(n) {
    const j = n % 10;
    const k = n % 100;
    
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}
