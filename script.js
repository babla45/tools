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
    toggleContainer.className = 'flex items-center text-sm mt-2 text-gray-600';
    
    // Create radio buttons for search type
    const subsequenceLabel = document.createElement('label');
    subsequenceLabel.className = 'flex items-center mr-4 cursor-pointer';
    
    const subsequenceRadio = document.createElement('input');
    subsequenceRadio.type = 'radio';
    subsequenceRadio.name = 'searchType';
    subsequenceRadio.value = 'subsequence';
    subsequenceRadio.id = 'subsequenceSearch';
    subsequenceRadio.checked = true; // Default
    subsequenceRadio.className = 'mr-1 accent-primary';
    
    subsequenceLabel.appendChild(subsequenceRadio);
    subsequenceLabel.appendChild(document.createTextNode('Subsequence Search'));
    
    const substringLabel = document.createElement('label');
    substringLabel.className = 'flex items-center cursor-pointer';
    
    const substringRadio = document.createElement('input');
    substringRadio.type = 'radio';
    substringRadio.name = 'searchType';
    substringRadio.value = 'substring';
    substringRadio.id = 'substringSearch';
    substringRadio.className = 'mr-1 accent-primary';
    
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
    customDropdown.className = 'absolute w-full max-h-48 overflow-y-auto border border-indigo-200 rounded-lg bg-white shadow-lg z-10';
    
    // Position dropdown below the search input
    const rect = toolSearch.getBoundingClientRect();
    customDropdown.style.top = (rect.bottom + window.scrollY) + 'px';
    customDropdown.style.left = (rect.left + window.scrollX) + 'px';
    customDropdown.style.width = toolSelect.offsetWidth + 'px';
    
    // Add options to custom dropdown
    toolsList.forEach(tool => {
        const option = document.createElement('div');
        option.textContent = tool.charAt(0).toUpperCase() + tool.slice(1);
        option.className = 'p-3 cursor-pointer border-b border-indigo-50 hover:bg-indigo-50 transition-colors duration-200';
        
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
        noResults.className = 'p-3 italic text-gray-500';
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
        inputArea.innerHTML = `
            <h3 class="text-lg font-semibold text-primary mb-4">Input</h3>
            <p class="text-gray-600">Select a tool from the dropdown to get started</p>
        `;
        return;
    }
    
    // Clear result with neutral styling
    resultDisplay.className = 'text-gray-600';
    resultDisplay.textContent = '';
    
    // Common input classes
    const textareaClass = `w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none 
        focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 
        min-h-[100px] resize-y font-mono`;
    const labelClass = 'block mb-1.5 font-medium text-gray-700';
    
    // Set up appropriate input fields based on selected tool
    let inputHTML = `<h3 class="text-lg font-semibold text-primary mb-4">${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)}</h3>`;
    
    switch(selectedTool) {
        case "prime check":
            inputHTML += `
                <label for="numberInput" class="${labelClass}">Enter a number:</label>
                <textarea id="numberInput" placeholder="Enter a number" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "leap year check":
            inputHTML += `
                <label for="yearInput" class="${labelClass}">Enter a year:</label>
                <textarea id="yearInput" placeholder="Enter a year" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('yearInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "prime factorization":
        case "divisors of a number":
        case "sum of digits":
        case "perfect number":
        case "factorial":
        case "armstrong number":
            inputHTML += `
                <label for="numberInput" class="${labelClass}">Enter a number:</label>
                <textarea id="numberInput" placeholder="Enter a number" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "sum of squares":
        case "sum of cubes":
            inputHTML += `
                <label for="numberInput" class="${labelClass}">Enter numbers (one per line or space-separated):</label>
                <textarea id="numberInput" placeholder="Example:
2
3
4

Or: 2 3 4" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "sum of array":
        case "gcd of array of number":
        case "lcm of array of number":
        case "sort array ascending":
        case "sort array descending":
        case "reverse array":
            inputHTML += `
                <label for="arrayInput" class="${labelClass}">Enter numbers (one per line or space-separated):</label>
                <textarea id="arrayInput" placeholder="Example:
5
10
15
20

Or: 5 10 15 20" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('arrayInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "fibonacci series":
            inputHTML += `
                <label for="numberInput" class="${labelClass}">Enter the number of terms:</label>
                <textarea id="numberInput" placeholder="Enter a number" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "nth fibonacci number":
            inputHTML += `
                <label for="numberInput" class="${labelClass}">Enter the position (n):</label>
                <textarea id="numberInput" placeholder="Enter a number" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "palindrome check":
        case "reverse string":
            inputHTML += `
                <label for="textInput" class="${labelClass}">Enter text:</label>
                <textarea id="textInput" placeholder="Enter text" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('textInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "reverse array of strings":
        case "sort array of strings":
            inputHTML += `
                <label for="arrayInput" class="${labelClass}">Enter strings (one per line or space-separated):</label>
                <textarea id="arrayInput" placeholder="Example:
apple
banana
cherry

Or: apple banana cherry" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('arrayInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        default:
            inputArea.innerHTML = `
                <h3 class="text-lg font-semibold text-primary mb-4">Input</h3>
                <p class="text-gray-600">Tool not implemented yet</p>
            `;
    }
}

// Calculate and display result
function calculateResult(tool) {
    let result;
    let resultClass = ''; // Class for styling the result
    
    // Helper function to parse input that can be either space or newline separated
    const parseInput = (input) => {
        return input.trim().split(/[\s\n]+/);
    };
    
    switch(tool) {
        case "prime check":
            const num = parseInt(document.getElementById('numberInput').value);
            const isPrimeResult = isPrime(num);
            result = `${num} is ${isPrimeResult ? '' : 'not '}a prime number.`;
            resultClass = isPrimeResult ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "leap year check":
            const year = parseInt(document.getElementById('yearInput').value);
            const isLeapYearResult = isLeapYear(year);
            result = `${year} is ${isLeapYearResult ? '' : 'not '}a leap year.`;
            resultClass = isLeapYearResult ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "prime factorization":
            const n = parseInt(document.getElementById('numberInput').value);
            const factors = primeFactorization(n);
            result = `Prime factorization of ${n}: ${factors.join(' × ')}`;
            resultClass = factors.length > 0 ? 'text-blue-600' : 'text-gray-600';
            break;
        case "divisors of a number":
            const number = parseInt(document.getElementById('numberInput').value);
            const divisors = getDivisors(number);
            result = `Divisors of ${number}: ${divisors.join(', ')}`;
            resultClass = divisors.length > 0 ? 'text-blue-600' : 'text-gray-600';
            break;
        case "sum of digits":
            const numForDigits = document.getElementById('numberInput').value;
            const digitSum = sumOfDigits(numForDigits);
            result = `Sum of digits of ${numForDigits}: ${digitSum}`;
            resultClass = digitSum > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "sum of squares":
            const numbersForSquares = parseInput(document.getElementById('numberInput').value).map(Number);
            const squaresSum = numbersForSquares.reduce((sum, num) => sum + num * num, 0);
            result = `Sum of squares of [${numbersForSquares.join(', ')}]: ${squaresSum}`;
            resultClass = squaresSum > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "sum of cubes":
            const numbersForCubes = parseInput(document.getElementById('numberInput').value).map(Number);
            const cubesSum = numbersForCubes.reduce((sum, num) => sum + Math.pow(num, 3), 0);
            result = `Sum of cubes of [${numbersForCubes.join(', ')}]: ${cubesSum}`;
            resultClass = cubesSum > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "sum of array":
            const arrayForSum = parseInput(document.getElementById('arrayInput').value).map(Number);
            const arraySum = sumOfArray(arrayForSum);
            result = `Sum of array [${arrayForSum.join(', ')}]: ${arraySum}`;
            resultClass = arraySum > 0 ? 'text-emerald-600' : arraySum < 0 ? 'text-rose-600' : 'text-blue-600';
            break;
        case "fibonacci series":
            const terms = parseInt(document.getElementById('numberInput').value);
            const series = fibonacciSeries(terms);
            result = `Fibonacci series (${terms} terms): ${series.join(', ')}`;
            resultClass = series.length > 0 ? 'text-blue-600' : 'text-gray-600';
            break;
        case "palindrome check":
            const text = document.getElementById('textInput').value;
            const isPalindromeResult = isPalindrome(text);
            result = `"${text}" is ${isPalindromeResult ? '' : 'not '}a palindrome.`;
            resultClass = isPalindromeResult ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "armstrong number":
            const armstrongNum = parseInt(document.getElementById('numberInput').value);
            const isArmstrongResult = isArmstrong(armstrongNum);
            result = `${armstrongNum} is ${isArmstrongResult ? '' : 'not '}an Armstrong number.`;
            resultClass = isArmstrongResult ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "perfect number":
            const perfectNum = parseInt(document.getElementById('numberInput').value);
            const isPerfectResult = isPerfect(perfectNum);
            result = `${perfectNum} is ${isPerfectResult ? '' : 'not '}a perfect number.`;
            resultClass = isPerfectResult ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "factorial":
            const factNum = parseInt(document.getElementById('numberInput').value);
            const factorialResult = factorial(factNum);
            result = `Factorial of ${factNum}: ${factorialResult}`;
            resultClass = factorialResult > 0 ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "gcd of array of number":
            const arrayForGcd = parseInput(document.getElementById('arrayInput').value).map(Number);
            const gcdResult = gcdOfArray(arrayForGcd);
            result = `GCD of [${arrayForGcd.join(', ')}]: ${gcdResult}`;
            resultClass = gcdResult > 0 ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "lcm of array of number":
            const arrayForLcm = parseInput(document.getElementById('arrayInput').value).map(Number);
            const lcmResult = lcmOfArray(arrayForLcm);
            result = `LCM of [${arrayForLcm.join(', ')}]: ${lcmResult}`;
            resultClass = lcmResult > 0 ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "nth fibonacci number":
            const position = parseInt(document.getElementById('numberInput').value);
            const fibonacciResult = nthFibonacci(position);
            result = `The ${position}${getOrdinalSuffix(position)} Fibonacci number is: ${fibonacciResult}`;
            resultClass = fibonacciResult > 0 ? 'text-emerald-600' : 'text-rose-600';
            break;
        case "sort array ascending":
            const arrayForAscSort = parseInput(document.getElementById('arrayInput').value).map(Number);
            const sortedAsc = sortArrayAscending(arrayForAscSort);
            result = `Sorted array (ascending): [${sortedAsc.join(', ')}]`;
            resultClass = sortedAsc.length > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "sort array descending":
            const arrayForDescSort = parseInput(document.getElementById('arrayInput').value).map(Number);
            const sortedDesc = sortArrayDescending(arrayForDescSort);
            result = `Sorted array (descending): [${sortedDesc.join(', ')}]`;
            resultClass = sortedDesc.length > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "reverse string":
            const stringToReverse = document.getElementById('textInput').value;
            const reversedString = reverseString(stringToReverse);
            result = `Reversed string: ${reversedString}`;
            resultClass = reversedString.length > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "reverse array":
            const arrayToReverse = parseInput(document.getElementById('arrayInput').value).map(Number);
            const reversedArray = reverseArray(arrayToReverse);
            result = `Reversed array: [${reversedArray.join(', ')}]`;
            resultClass = reversedArray.length > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "reverse array of strings":
            const stringArrayToReverse = parseInput(document.getElementById('arrayInput').value);
            const reversedStringArray = reverseArrayOfStrings(stringArrayToReverse);
            result = `Reversed array of strings: [${reversedStringArray.join(', ')}]`;
            resultClass = reversedStringArray.length > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        case "sort array of strings":
            const stringArrayToSort = parseInput(document.getElementById('arrayInput').value);
            const sortedStringArray = sortArrayOfStrings(stringArrayToSort);
            result = `Sorted array of strings: [${sortedStringArray.join(', ')}]`;
            resultClass = sortedStringArray.length > 0 ? 'text-emerald-600' : 'text-blue-600';
            break;
        default:
            result = "Tool not implemented yet";
            resultClass = 'text-gray-600';
    }
    
    // Update result with styling
    resultDisplay.className = `font-medium ${resultClass}`;
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
    const numbers = Array.from({length: n}, (_, i) => i + 1);
    return numbers.reduce((sum, num) => sum + num * num, 0);
}

function sumOfCubes(n) {
    const numbers = Array.from({length: n}, (_, i) => i + 1);
    return numbers.reduce((sum, num) => sum + Math.pow(num, 3), 0);
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
