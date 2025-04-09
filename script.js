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
    "sort array of strings",
    "roman to decimal",
    "decimal to roman",
    "count digits",
    "greatest in array",
    "smallest in array",
    "average of array",
    "base converter",
    "base64 encoder",
    "base64 decoder",
    "custom base converter",
    "set operations",
    "frequency counter",
    "character frequency",
    "unique elements",
    "base math operations",
    "unit converter",
    "encryption and decryption",
    "polynomial roots",
    "matrix operations" // Added new tool
];

// Remove duplicates from the list
const uniqueTools = [...new Set(tools)];

// DOM Elements
const toolSelect = document.getElementById('toolSelect');
const toolSearch = document.getElementById('toolSearch');
const inputArea = document.getElementById('inputArea');
const resultArea = document.getElementById('resultArea');
const resultDisplay = document.getElementById('result');

// Check if all DOM elements exist
if (!toolSelect || !toolSearch || !inputArea || !resultArea || !resultDisplay) {
    console.error("Some DOM elements were not found:", {
        toolSelect: !!toolSelect,
        toolSearch: !!toolSearch,
        inputArea: !!inputArea,
        resultArea: !!resultArea,
        resultDisplay: !!resultDisplay
    });
}

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
    
    // Check if DOM elements exist
    console.log("DOM elements:", {
        toolSelect: !!toolSelect,
        toolSearch: !!toolSearch,
        inputArea: !!inputArea,
        resultArea: !!resultArea,
        resultDisplay: !!resultDisplay
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
    
    // Sort tools alphabetically
    const sortedTools = [...toolsList].sort();
    
    sortedTools.forEach(tool => {
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
        case "greatest in array":
        case "smallest in array":
        case "average of array":
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
        case "base converter":
            inputHTML += `
                <label for="numberInput" class="${labelClass}">Enter a number:</label>
                <textarea id="numberInput" placeholder="Enter a number" class="${textareaClass}"></textarea>
                <label for="baseSelect" class="${labelClass}">Select the original base:</label>
                <select id="baseSelect" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="2">Binary (Base 2)</option>
                    <option value="8">Octal (Base 8)</option>
                    <option value="10" selected>Decimal (Base 10)</option>
                    <option value="16">Hexadecimal (Base 16)</option>
                    <option value="custom">Custom Base</option>
                </select>
                <div id="customBaseDiv" class="hidden">
                    <label for="customBaseInput" class="${labelClass}">Specify Custom Base (2-36):</label>
                    <input type="number" id="customBaseInput" min="2" max="36" value="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                </div>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            document.getElementById('baseSelect').addEventListener('change', function() {
                const customBaseDiv = document.getElementById('customBaseDiv');
                if (this.value === 'custom') {
                    customBaseDiv.classList.remove('hidden');
                } else {
                    customBaseDiv.classList.add('hidden');
                }
                calculateResult(selectedTool);
            });
            document.getElementById('customBaseInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "base64 encoder":
            inputHTML += `
                <label for="textInput" class="${labelClass}">Enter text to encode:</label>
                <textarea id="textInput" placeholder="Enter text" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('textInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "base64 decoder":
            inputHTML += `
                <label for="base64Input" class="${labelClass}">Enter Base64 string to decode:</label>
                <textarea id="base64Input" placeholder="Enter Base64 string" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('base64Input').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "custom base converter":
            inputHTML += `
                <label for="numberInput" class="${labelClass}">Enter a number:</label>
                <textarea id="numberInput" placeholder="Enter a number" class="${textareaClass}"></textarea>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="fromBaseInput" class="${labelClass}">From Base (2-36):</label>
                        <input type="number" id="fromBaseInput" min="2" max="36" value="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                        <label for="toBaseInput" class="${labelClass}">To Base (2-36):</label>
                        <input type="number" id="toBaseInput" min="2" max="36" value="16" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                </div>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('numberInput').addEventListener('input', () => calculateResult(selectedTool));
            document.getElementById('fromBaseInput').addEventListener('input', () => calculateResult(selectedTool));
            document.getElementById('toBaseInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "set operations":
            inputHTML += `
                <label for="set1Input" class="${labelClass}">Enter first set (comma or space separated):</label>
                <textarea id="set1Input" placeholder="Example: 1, 2, 3, 4 or 1 2 3 4" class="${textareaClass}"></textarea>
                <label for="set2Input" class="${labelClass}">Enter second set (comma or space separated):</label>
                <textarea id="set2Input" placeholder="Example: 3, 4, 5, 6 or 3 4 5 6" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('set1Input').addEventListener('input', () => calculateResult(selectedTool));
            document.getElementById('set2Input').addEventListener('input', () => calculateResult(selectedTool));
            break;
            
        case "frequency counter":
            inputHTML += `
                <label for="arrayInput" class="${labelClass}">Enter numbers (comma, space or line separated):</label>
                <textarea id="arrayInput" placeholder="Example: 1, 2, 3, 2, 1, 4, 5, 2" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('arrayInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
            
        case "character frequency":
            inputHTML += `
                <label for="textInput" class="${labelClass}">Enter text:</label>
                <textarea id="textInput" placeholder="Enter text to count character frequency" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('textInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
            
        case "unique elements":
            inputHTML += `
                <label for="arrayInput" class="${labelClass}">Enter elements (comma, space or line separated):</label>
                <textarea id="arrayInput" placeholder="Example: apple, banana, apple, orange, banana" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('arrayInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "base math operations":
            inputHTML += `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="firstNumInput" class="${labelClass}">First Number:</label>
                        <textarea id="firstNumInput" placeholder="Enter first number" class="${textareaClass}"></textarea>
                        <label for="firstBaseSelect" class="${labelClass}">Base of 1st number:</label>
                        <select id="firstBaseSelect" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="2">Binary (Base 2)</option>
                            <option value="8">Octal (Base 8)</option>
                            <option value="10" selected>Decimal (Base 10)</option>
                            <option value="16">Hexadecimal (Base 16)</option>
                            <option value="custom">Custom Base</option>
                        </select>
                        <div id="firstCustomBase" class="hidden">
                            <label for="firstCustomBaseInput" class="${labelClass}">Specify Custom Base (2-36):</label>
                            <input type="number" id="firstCustomBaseInput" min="2" max="36" value="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                    </div>
                    <div>
                        <label for="secondNumInput" class="${labelClass}">Second Number:</label>
                        <textarea id="secondNumInput" placeholder="Enter second number" class="${textareaClass}"></textarea>
                        <label for="secondBaseSelect" class="${labelClass}">Base of 2nd number:</label>
                        <select id="secondBaseSelect" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="2">Binary (Base 2)</option>
                            <option value="8">Octal (Base 8)</option>
                            <option value="10" selected>Decimal (Base 10)</option>
                            <option value="16">Hexadecimal (Base 16)</option>
                            <option value="custom">Custom Base</option>
                        </select>
                        <div id="secondCustomBase" class="hidden">
                            <label for="secondCustomBaseInput" class="${labelClass}">Specify Custom Base (2-36):</label>
                            <input type="number" id="secondCustomBaseInput" min="2" max="36" value="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                    </div>
                </div>
                <label for="operationSelect" class="${labelClass}">Operation:</label>
                <select id="operationSelect" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="add" selected>Addition (+)</option>
                    <option value="subtract">Subtraction (-)</option>
                    <option value="multiply">Multiplication (×)</option>
                    <option value="divide">Division (÷)</option>
                    <option value="modulo">Modulo (remainder) (%)</option>
                </select>
            `;
            inputArea.innerHTML = inputHTML;
            
            // Add event listeners
            document.getElementById('firstNumInput').addEventListener('input', () => calculateResult(selectedTool));
            document.getElementById('secondNumInput').addEventListener('input', () => calculateResult(selectedTool));
            document.getElementById('firstBaseSelect').addEventListener('change', function() {
                const customBaseDiv = document.getElementById('firstCustomBase');
                if (this.value === 'custom') {
                    customBaseDiv.classList.remove('hidden');
                } else {
                    customBaseDiv.classList.add('hidden');
                }
                calculateResult(selectedTool);
            });
            document.getElementById('secondBaseSelect').addEventListener('change', function() {
                const customBaseDiv = document.getElementById('secondCustomBase');
                if (this.value === 'custom') {
                    customBaseDiv.classList.remove('hidden');
                } else {
                    customBaseDiv.classList.add('hidden');
                }
                calculateResult(selectedTool);
            });
            document.getElementById('operationSelect').addEventListener('change', () => calculateResult(selectedTool));
            
            // Add event listeners for custom base inputs if they exist
            const firstCustomBaseInput = document.getElementById('firstCustomBaseInput');
            const secondCustomBaseInput = document.getElementById('secondCustomBaseInput');
            if (firstCustomBaseInput) {
                firstCustomBaseInput.addEventListener('input', () => calculateResult(selectedTool));
            }
            if (secondCustomBaseInput) {
                secondCustomBaseInput.addEventListener('input', () => calculateResult(selectedTool));
            }
            break;
        case "reverse string":
            inputHTML += `
                <label for="textInput" class="${labelClass}">Enter text to reverse:</label>
                <textarea id="textInput" placeholder="Enter text" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('textInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "unit converter":
            inputHTML += `
                <label for="unitCategory" class="${labelClass}">Select unit category:</label>
                <select id="unitCategory" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="length" selected>Length</option>
                    <option value="mass">Mass/Weight</option>
                    <option value="temperature">Temperature</option>
                    <option value="area">Area</option>
                    <option value="volume">Volume</option>
                    <option value="time">Time</option>
                    <option value="digital">Digital Storage</option>
                    <option value="speed">Speed</option>
                </select>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="fromUnit" class="${labelClass}">From:</label>
                        <select id="fromUnit" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <!-- Options will be populated based on category -->
                        </select>
                        <label for="valueInput" class="${labelClass}">Value:</label>
                        <input type="number" id="valueInput" placeholder="Enter value" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                        <label for="toUnit" class="${labelClass}">To:</label>
                        <select id="toUnit" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <!-- Options will be populated based on category -->
                        </select>
                        <div class="h-[41px] mb-3"></div> <!-- Empty space placeholder with same height as the removed button -->
                    </div>
                </div>
            `;
            inputArea.innerHTML = inputHTML;
            
            // Set up event listeners and populate units
            document.getElementById('unitCategory').addEventListener('change', populateUnitOptions);
            document.getElementById('valueInput').addEventListener('input', () => calculateResult(selectedTool));
            document.getElementById('fromUnit').addEventListener('change', () => calculateResult(selectedTool));
            document.getElementById('toUnit').addEventListener('change', () => calculateResult(selectedTool));
            
            // Initially populate unit options based on default category (length)
            populateUnitOptions();
            break;
        case "encryption and decryption":
            inputHTML += `
                <label for="encryptionType" class="${labelClass}">Select encryption type:</label>
                <select id="encryptionType" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="caesar" selected>Caesar Cipher</option>
                    <option value="base64">Base64</option>
                    <option value="rot13">ROT13</option>
                    <option value="xor">XOR Cipher</option>
                </select>
                
                <div id="encryptionOptions">
                    <div id="caesarOptions" class="hidden">
                        <label for="shiftAmount" class="${labelClass}">Shift amount:</label>
                        <input type="number" id="shiftAmount" value="3" min="1" max="25" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div id="xorOptions" class="hidden">
                        <label for="xorKey" class="${labelClass}">XOR Key:</label>
                        <input type="text" id="xorKey" value="key" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-3">
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="radio" name="encryptMode" value="encrypt" class="mr-2 accent-primary" checked>
                        <span>Encrypt</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="radio" name="encryptMode" value="decrypt" class="mr-2 accent-primary">
                        <span>Decrypt</span>
                    </label>
                </div>
                
                <label for="encryptionInput" class="${labelClass}">Enter text:</label>
                <textarea id="encryptionInput" placeholder="Enter text to encrypt/decrypt" class="${textareaClass}"></textarea>
            `;
            inputArea.innerHTML = inputHTML;
            
            // Set up event listeners
            document.getElementById('encryptionType').addEventListener('change', function() {
                updateEncryptionOptions(this.value);
                calculateResult(selectedTool);
            });
            document.getElementById('encryptionInput').addEventListener('input', () => calculateResult(selectedTool));
            document.querySelectorAll('input[name="encryptMode"]').forEach(radio => {
                radio.addEventListener('change', () => calculateResult(selectedTool));
            });
            
            // For Caesar cipher
            const shiftAmount = document.getElementById('shiftAmount');
            if (shiftAmount) {
                shiftAmount.addEventListener('input', () => calculateResult(selectedTool));
            }
            
            // For XOR cipher
            const xorKey = document.getElementById('xorKey');
            if (xorKey) {
                xorKey.addEventListener('input', () => calculateResult(selectedTool));
            }
            
            // Initialize encryption options
            updateEncryptionOptions('caesar');
            break;
        case "polynomial roots":
            inputHTML += `
                <label for="polynomialInput" class="${labelClass}">Enter polynomial coefficients:</label>
                <textarea id="polynomialInput" placeholder="Enter coefficients from highest to lowest degree, one per line or space-separated.
Example for 2x² + 3x - 5:
2
3
-5" class="${textareaClass}"></textarea>
                <div class="text-gray-600 text-sm mb-3">
                    <p>Enter the coefficients of the polynomial from highest to lowest degree.</p>
                    <p>For example, for 2x² + 3x - 5, enter: 2, 3, -5</p>
                </div>
            `;
            inputArea.innerHTML = inputHTML;
            document.getElementById('polynomialInput').addEventListener('input', () => calculateResult(selectedTool));
            break;
        case "matrix operations":
            inputHTML += `
                <div class="mb-4">
                    <label for="operationSelect" class="${labelClass}">Select matrix operation:</label>
                    <select id="operationSelect" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="add" selected>Addition (A + B)</option>
                        <option value="subtract">Subtraction (A - B)</option>
                        <option value="multiply">Multiplication (A × B)</option>
                        <option value="determinant">Determinant (|A|)</option>
                        <option value="inverse">Inverse (A⁻¹)</option>
                        <option value="transpose">Transpose (Aᵀ)</option>
                        <option value="trace">Trace (tr(A))</option>
                    </select>
                </div>
                
                <div class="grid grid-cols-2 gap-6">
                    <div id="matrixASection">
                        <h4 class="font-semibold mb-2">Matrix A</h4>
                        <div class="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label for="matrixARows" class="${labelClass}">Rows:</label>
                                <input type="number" id="matrixARows" value="2" min="1" max="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg">
                            </div>
                            <div>
                                <label for="matrixACols" class="${labelClass}">Columns:</label>
                                <input type="number" id="matrixACols" value="2" min="1" max="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg">
                            </div>
                        </div>
                        <textarea id="matrixAInput" placeholder="Enter values (space or comma-separated):
1 2
3 4" class="${textareaClass}"></textarea>
                        <p class="text-xs text-gray-500 mt-1">Enter values row by row, space or comma-separated.</p>
                    </div>
                    
                    <div id="matrixBSection">
                        <h4 class="font-semibold mb-2">Matrix B</h4>
                        <div class="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label for="matrixBRows" class="${labelClass}">Rows:</label>
                                <input type="number" id="matrixBRows" value="2" min="1" max="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg">
                            </div>
                            <div>
                                <label for="matrixBCols" class="${labelClass}">Columns:</label>
                                <input type="number" id="matrixBCols" value="2" min="1" max="10" class="w-full p-2.5 mb-3 border-2 border-indigo-200 rounded-lg">
                            </div>
                        </div>
                        <textarea id="matrixBInput" placeholder="Enter values (space or comma-separated):
5 6
7 8" class="${textareaClass}"></textarea>
                        <p class="text-xs text-gray-500 mt-1">Enter values row by row, space or comma-separated.</p>
                    </div>
                </div>
            `;
            
            inputArea.innerHTML = inputHTML;
            
            // Set up event listeners
            document.getElementById('operationSelect').addEventListener('change', function() {
                const operation = this.value;
                const matrixBSection = document.getElementById('matrixBSection');
                
                // Show/hide matrix B based on operation
                if (['determinant', 'inverse', 'transpose', 'trace'].includes(operation)) {
                    matrixBSection.style.display = 'none';
                } else {
                    matrixBSection.style.display = 'block';
                }
                
                calculateResult('matrix operations');
            });
            
            document.getElementById('matrixARows').addEventListener('input', () => calculateResult('matrix operations'));
            document.getElementById('matrixACols').addEventListener('input', () => calculateResult('matrix operations'));
            document.getElementById('matrixBRows').addEventListener('input', () => calculateResult('matrix operations'));
            document.getElementById('matrixBCols').addEventListener('input', () => calculateResult('matrix operations'));
            document.getElementById('matrixAInput').addEventListener('input', () => calculateResult('matrix operations'));
            document.getElementById('matrixBInput').addEventListener('input', () => calculateResult('matrix operations'));
            
            break;
        default:
            inputArea.innerHTML = `
                <h3 class="text-lg font-semibold text-primary mb-4">Input</h3>
                <p class="text-gray-600">Tool not implemented yet</p>
            `;
    }
}

// Function to convert a number to superscript
function toSuperscript(num) {
    const superscripts = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        '-': '⁻', '+': '⁺'
    };
    
    return num.toString().split('').map(char => superscripts[char] || char).join('');
}

// Function to describe the polynomial in human-readable form
function describePolynomial(coeffs) {
    if (coeffs.length === 0) return "0";
    
    let terms = [];
    const degree = coeffs.length - 1;
    
    for (let i = 0; i <= degree; i++) {
        const coeff = coeffs[i];
        if (coeff === 0) continue;
        
        const power = degree - i;
        let term = '';
        
        // Handle the coefficient
        if (power === 0) {
            // Constant term
            term = coeff.toString();
        } else {
            // Non-constant term
            if (Math.abs(coeff) === 1) {
                term = coeff < 0 ? '-' : '';
            } else {
                term = coeff.toString();
            }
            
            // Add the variable with correct power
            if (power === 1) {
                term += 'x';
            } else {
                term += 'x' + toSuperscript(power); // Use superscript
            }
        }
        
        terms.push(term);
    }
    
    if (terms.length === 0) return "0";
    
    // Join terms with + or - signs
    let result = terms[0];
    for (let i = 1; i < terms.length; i++) {
        const term = terms[i];
        if (term[0] === '-') {
            result += ' ' + term;
        } else {
            result += ' + ' + term;
        }
    }
    
    return result;
}

// Calculate and display result
function calculateResult(tool) {
    let result;
    let resultClass = ''; // Class for styling the result
    
    // Helper function to parse input that can be either space or newline separated
    const parseInput = (input) => {
        return input.trim().split(/[\s,\n]+/).filter(item => item !== '');
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
            resultDisplay.innerHTML = result;
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
            const palindromeText = document.getElementById('textInput').value;
            const isPalindromeResult = isPalindrome(palindromeText);
            result = `"${palindromeText}" is ${isPalindromeResult ? '' : 'not '}a palindrome.`;
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
        case "greatest in array":
            const arrayForMax = parseInput(document.getElementById('arrayInput').value).map(Number);
            const maxResult = Math.max(...arrayForMax);
            result = `Greatest number in array [${arrayForMax.join(', ')}]: ${maxResult}`;
            resultClass = 'text-emerald-600';
            break;
        case "smallest in array":
            const arrayForMin = parseInput(document.getElementById('arrayInput').value).map(Number);
            const minResult = Math.min(...arrayForMin);
            result = `Smallest number in array [${arrayForMin.join(', ')}]: ${minResult}`;
            resultClass = 'text-emerald-600';
            break;
        case "average of array":
            const arrayForAvg = parseInput(document.getElementById('arrayInput').value).map(Number);
            const avgResult = arrayForAvg.reduce((sum, num) => sum + num, 0) / arrayForAvg.length;
            result = `Average of array [${arrayForAvg.join(', ')}]: ${avgResult.toFixed(2)}`;
            resultClass = 'text-emerald-600';
            break;
        case "base converter":
            const numToConvert = document.getElementById('numberInput').value.trim();
            let originalBase = document.getElementById('baseSelect').value;
            
            if (originalBase === 'custom') {
                originalBase = parseInt(document.getElementById('customBaseInput').value);
            } else {
                originalBase = parseInt(originalBase);
            }
            
            if (!numToConvert) {
                result = "Please enter a number";
                resultClass = 'text-gray-600';
                break;
            }
            
            if (originalBase < 2 || originalBase > 36) {
                result = "Base must be between 2 and 36";
                resultClass = 'text-rose-600';
                break;
            }
            
            // Validate that each digit is valid for the selected base
            const isValidForBase = numToConvert.split('').every(digit => {
                const digitValue = parseInt(digit, 36); // Parse in base 36 to handle letters
                return !isNaN(digitValue) && digitValue < originalBase;
            });
            
            if (!isValidForBase) {
                result = `Invalid number for base ${originalBase}. Each digit must be less than the base.`;
                resultClass = 'text-rose-600';
                break;
            }
            
            try {
                const decimalValue = parseInt(numToConvert, originalBase);
                const binary = decimalValue.toString(2);
                const octal = decimalValue.toString(8);
                const decimal = decimalValue.toString(10);
                const hex = decimalValue.toString(16).toUpperCase();
                
                result = `Binary: ${binary}\nOctal: ${octal}\nDecimal: ${decimal}\nHexadecimal: ${hex}`;
                resultClass = 'text-blue-600 whitespace-pre-line';
            } catch (e) {
                result = "Invalid number for the selected base";
                resultClass = 'text-rose-600';
            }
            break;
        case "base64 encoder":
            const textToEncode = document.getElementById('textInput').value;
            try {
                const encoded = btoa(textToEncode);
                result = `Base64 encoded: ${encoded}`;
                resultClass = 'text-blue-600';
            } catch (e) {
                result = "Error encoding to Base64. Make sure input contains only ASCII characters.";
                resultClass = 'text-rose-600';
            }
            break;
        case "base64 decoder":
            const base64ToDecode = document.getElementById('base64Input').value.trim();
            try {
                const decoded = atob(base64ToDecode);
                result = `Decoded text: ${decoded}`;
                resultClass = 'text-blue-600';
            } catch (e) {
                result = "Error decoding Base64. Make sure input is valid Base64.";
                resultClass = 'text-rose-600';
            }
            break;
        case "custom base converter":
            const customNumToConvert = document.getElementById('numberInput').value.trim();
            const fromBase = parseInt(document.getElementById('fromBaseInput').value);
            const toBase = parseInt(document.getElementById('toBaseInput').value);
            
            if (!customNumToConvert) {
                result = "Please enter a number";
                resultClass = 'text-gray-600';
                break;
            }
            
            if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
                result = "Base must be between 2 and 36";
                resultClass = 'text-rose-600';
                break;
            }
            
            // Validate that each digit is valid for the selected base
            const isValidInput = customNumToConvert.split('').every(digit => {
                const digitValue = parseInt(digit, 36); // Parse in base 36 to handle letters
                return !isNaN(digitValue) && digitValue < fromBase;
            });
            
            if (!isValidInput) {
                result = `Invalid number for base ${fromBase}. Each digit must be less than the base.`;
                resultClass = 'text-rose-600';
                break;
            }
            
            try {
                const decimalValue = parseInt(customNumToConvert, fromBase);
                const convertedValue = decimalValue.toString(toBase).toUpperCase();
                
                // Also convert to standard bases
                const binaryValue = decimalValue.toString(2);
                const octalValue = decimalValue.toString(8);
                const decimalDisplay = decimalValue.toString(10);
                const hexValue = decimalValue.toString(16).toUpperCase();
                
                result = `${customNumToConvert} (Base ${fromBase}) = ${convertedValue} (Base ${toBase})\n\n` +
                         `Standard Bases:\n` +
                         `Binary (Base 2): ${binaryValue}\n` +
                         `Octal (Base 8): ${octalValue}\n` +
                         `Decimal (Base 10): ${decimalDisplay}\n` +
                         `Hexadecimal (Base 16): ${hexValue}`;
                resultClass = 'text-blue-600 whitespace-pre-line';
            } catch (e) {
                result = "Invalid number for the selected base";
                resultClass = 'text-rose-600';
            }
            break;
        case "set operations":
            const set1Input = document.getElementById('set1Input').value;
            const set2Input = document.getElementById('set2Input').value;
            
            // Parse inputs, remove duplicates
            const set1 = new Set(parseInput(set1Input));
            const set2 = new Set(parseInput(set2Input));
            
            // Perform set operations
            const union = [...new Set([...set1, ...set2])];
            
            const intersection = [...set1].filter(item => set2.has(item));
            
            const difference1 = [...set1].filter(item => !set2.has(item));
            const difference2 = [...set2].filter(item => !set1.has(item));
            
            const symmetricDifference = [...difference1, ...difference2];
            
            result = `Set 1: [${[...set1].join(', ')}]\n` +
                     `Set 2: [${[...set2].join(', ')}]\n\n` +
                     `Union: [${union.join(', ')}]\n` + 
                     `Intersection: [${intersection.join(', ')}]\n` +
                     `Difference (Set1 - Set2): [${difference1.join(', ')}]\n` +
                     `Difference (Set2 - Set1): [${difference2.join(', ')}]\n` +
                     `Symmetric Difference: [${symmetricDifference.join(', ')}]`;
            resultClass = 'text-blue-600 whitespace-pre-line';
            break;
            
        case "frequency counter":
            const numbersInput = document.getElementById('arrayInput').value;
            const numbers = parseInput(numbersInput);
            
            const frequencyMap = {};
            numbers.forEach(num => {
                frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            });
            
            // Format the result
            const frequencyResult = Object.entries(frequencyMap)
                .sort((a, b) => b[1] - a[1]) // Sort by frequency (highest first)
                .map(([number, count]) => `${number}: ${count}`)
                .join('\n');
            
            result = `Frequency of elements:\n${frequencyResult}`;
            resultClass = 'text-blue-600 whitespace-pre-line';
            break;
            
        case "character frequency":
            const freqText = document.getElementById('textInput').value;
            
            const charFrequency = {};
            for (const char of freqText) {
                if (char !== ' ' && char !== '\n') {
                    charFrequency[char] = (charFrequency[char] || 0) + 1;
                }
            }
            
            // Format the result
            const charFreqResult = Object.entries(charFrequency)
                .sort((a, b) => b[1] - a[1]) // Sort by frequency (highest first)
                .map(([char, count]) => `'${char}': ${count}`)
                .join('\n');
            
            result = `Character frequency:\n${charFreqResult}`;
            resultClass = 'text-blue-600 whitespace-pre-line';
            break;
            
        case "unique elements":
            const elements = parseInput(document.getElementById('arrayInput').value);
            const uniqueElements = [...new Set(elements)];
            
            result = `Original elements: [${elements.join(', ')}]\n` +
                     `Unique elements: [${uniqueElements.join(', ')}]\n` +
                     `Number of unique elements: ${uniqueElements.length}`;
            resultClass = 'text-blue-600 whitespace-pre-line';
            break;
        case "base math operations":
            const firstNumText = document.getElementById('firstNumInput').value.trim();
            const secondNumText = document.getElementById('secondNumInput').value.trim();
            
            // Get bases
            let firstBase = document.getElementById('firstBaseSelect').value;
            let secondBase = document.getElementById('secondBaseSelect').value;
            
            // If custom base is selected, get the custom base value
            if (firstBase === 'custom') {
                firstBase = parseInt(document.getElementById('firstCustomBaseInput').value);
            } else {
                firstBase = parseInt(firstBase);
            }
            
            if (secondBase === 'custom') {
                secondBase = parseInt(document.getElementById('secondCustomBaseInput').value);
            } else {
                secondBase = parseInt(secondBase);
            }
            
            // Check if bases are valid
            if (firstBase < 2 || firstBase > 36 || secondBase < 2 || secondBase > 36) {
                result = "Base must be between 2 and 36";
                resultClass = 'text-rose-600';
                break;
            }
            
            // Check if input is valid
            if (!firstNumText || !secondNumText) {
                result = "Please enter both numbers";
                resultClass = 'text-gray-600';
                break;
            }
            
            try {
                // Convert both numbers to decimal
                const firstNum = parseInt(firstNumText, firstBase);
                const secondNum = parseInt(secondNumText, secondBase);
                
                // Get selected operation
                const operation = document.getElementById('operationSelect').value;
                
                // Perform operation
                let resultValue;
                let operationSymbol;
                
                switch(operation) {
                    case "add":
                        resultValue = firstNum + secondNum;
                        operationSymbol = "+";
                        break;
                    case "subtract":
                        resultValue = firstNum - secondNum;
                        operationSymbol = "-";
                        break;
                    case "multiply":
                        resultValue = firstNum * secondNum;
                        operationSymbol = "×";
                        break;
                    case "divide":
                        if (secondNum === 0) {
                            result = "Cannot divide by zero";
                            resultClass = 'text-rose-600';
                            return; // Exit early
                        }
                        resultValue = firstNum / secondNum;
                        operationSymbol = "÷";
                        break;
                    case "modulo":
                        if (secondNum === 0) {
                            result = "Cannot perform modulo by zero";
                            resultClass = 'text-rose-600';
                            return; // Exit early
                        }
                        resultValue = firstNum % secondNum;
                        operationSymbol = "%";
                        break;
                }
                
                // Convert result to different bases
                const binaryResult = Math.floor(resultValue).toString(2);
                const octalResult = Math.floor(resultValue).toString(8);
                const decimalResult = resultValue.toString(10);
                const hexResult = Math.floor(resultValue).toString(16).toUpperCase();
                
                // Format result
                result = `${firstNumText} (Base ${firstBase}) ${operationSymbol} ${secondNumText} (Base ${secondBase}) = ${decimalResult} (Base 10)\n\n` +
                         `Results in different bases:\n` +
                         `Binary (Base 2): ${binaryResult}\n` +
                         `Octal (Base 8): ${octalResult}\n` +
                         `Decimal (Base 10): ${decimalResult}\n` +
                         `Hexadecimal (Base 16): ${hexResult}`;
                
                resultClass = 'text-blue-600 whitespace-pre-line';
            } catch (e) {
                result = "Invalid input for the selected bases";
                resultClass = 'text-rose-600';
            }
            break;
        case "unit converter":
            const category = document.getElementById('unitCategory').value;
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            const inputValue = parseFloat(document.getElementById('valueInput').value);
            
            if (isNaN(inputValue)) {
                result = "Please enter a valid number";
                resultClass = 'text-gray-600';
                break;
            }
            
            try {
                const convertedValue = convertUnit(inputValue, fromUnit, toUnit, category);
                const formattedInput = formatUnitDisplay(inputValue, fromUnit, category);
                const formattedOutput = formatUnitDisplay(convertedValue, toUnit, category);
                
                result = `${formattedInput} = ${formattedOutput}`;
                resultClass = 'text-emerald-600';
            } catch (error) {
                result = error.message || "Conversion error";
                resultClass = 'text-rose-600';
            }
            break;
        case "encryption and decryption":
            const encryptionType = document.getElementById('encryptionType').value;
            const encryptMode = document.querySelector('input[name="encryptMode"]:checked').value;
            const textToProcess = document.getElementById('encryptionInput').value;
            
            if (!textToProcess) {
                result = "Please enter text to encrypt/decrypt";
                resultClass = 'text-gray-600';
                break;
            }
            
            try {
                switch(encryptionType) {
                    case 'caesar':
                        const shift = parseInt(document.getElementById('shiftAmount').value);
                        if (encryptMode === 'encrypt') {
                            result = caesarCipher(textToProcess, shift);
                        } else {
                            result = caesarCipher(textToProcess, 26 - shift); // Decrypt with inverse shift
                        }
                        break;
                    case 'base64':
                        if (encryptMode === 'encrypt') {
                            result = btoa(textToProcess);
                        } else {
                            try {
                                result = atob(textToProcess);
                            } catch(e) {
                                throw new Error("Invalid Base64 string");
                            }
                        }
                        break;
                    case 'rot13':
                        result = rot13(textToProcess); // ROT13 is its own inverse
                        break;
                    case 'xor':
                        const xorKey = document.getElementById('xorKey').value;
                        if (!xorKey) {
                            throw new Error("XOR key cannot be empty");
                        }
                        // XOR is symmetric, so encrypt and decrypt are the same operation
                        result = xorCipher(textToProcess, xorKey);
                        break;
                }
                
                resultClass = 'text-blue-600 whitespace-pre-line';
            } catch (e) {
                result = e.message || "Error processing text";
                resultClass = 'text-rose-600';
            }
            break;
        case "polynomial roots":
            const polynomialCoeffs = parseInput(document.getElementById('polynomialInput').value).map(Number);
            
            if (polynomialCoeffs.length <= 1) {
                result = "Please enter coefficients for a valid polynomial";
                resultClass = 'text-gray-600';
                break;
            }
            
            try {
                const degree = polynomialCoeffs.length - 1;
                const polyDesc = describePolynomial(polynomialCoeffs);
                const roots = findPolynomialRoots(polynomialCoeffs);
                
                // Format the result
                result = `Polynomial: ${polyDesc}\nDegree: ${degree}\n\nRoots:`;
                
                if (roots.length === 0) {
                    result += "\nNo real or simple roots found.";
                } else {
                    roots.forEach((root, i) => {
                        if (typeof root === 'object' && root.re !== undefined) {
                            // Complex root
                            const re = root.re.toFixed(4).replace(/\.0000$/, '');
                            const im = Math.abs(root.im).toFixed(4).replace(/\.0000$/, '');
                            const sign = root.im < 0 ? '-' : '+';
                            result += `\nx${i+1} = ${re} ${sign} ${im}i`;
                        } else {
                            // Real root
                            result += `\nx${i+1} = ${root.toFixed(4).replace(/\.0000$/, '')}`;
                        }
                    });
                }
                
                resultClass = 'text-blue-600 whitespace-pre-line';
            } catch (e) {
                result = `Error finding roots: ${e.message}`;
                resultClass = 'text-rose-600';
            }
            break;
        case "matrix operations":
            const operation = document.getElementById('operationSelect').value;
            const matrixARows = parseInt(document.getElementById('matrixARows').value);
            const matrixACols = parseInt(document.getElementById('matrixACols').value);
            const matrixBRows = parseInt(document.getElementById('matrixBRows').value);
            const matrixBCols = parseInt(document.getElementById('matrixBCols').value);
            
            // Parse matrices from input
            const matrixA = parseMatrix(document.getElementById('matrixAInput').value, matrixARows, matrixACols);
            
            try {
                let resultMatrix;
                let resultText;
                
                switch(operation) {
                    case "add":
                        const matrixB_add = parseMatrix(document.getElementById('matrixBInput').value, matrixBRows, matrixBCols);
                        if (matrixARows !== matrixBRows || matrixACols !== matrixBCols) {
                            throw new Error("Matrices must have the same dimensions for addition.");
                        }
                        resultMatrix = matrixAddition(matrixA, matrixB_add);
                        resultText = `Result of A + B:\n${formatMatrix(resultMatrix)}`;
                        break;
                        
                    case "subtract":
                        const matrixB_sub = parseMatrix(document.getElementById('matrixBInput').value, matrixBRows, matrixBCols);
                        if (matrixARows !== matrixBRows || matrixACols !== matrixBCols) {
                            throw new Error("Matrices must have the same dimensions for subtraction.");
                        }
                        resultMatrix = matrixSubtraction(matrixA, matrixB_sub);
                        resultText = `Result of A - B:\n${formatMatrix(resultMatrix)}`;
                        break;
                        
                    case "multiply":
                        const matrixB_mul = parseMatrix(document.getElementById('matrixBInput').value, matrixBRows, matrixBCols);
                        if (matrixACols !== matrixBRows) {
                            throw new Error("Number of columns in Matrix A must equal number of rows in Matrix B for multiplication.");
                        }
                        resultMatrix = matrixMultiplication(matrixA, matrixB_mul);
                        resultText = `Result of A × B:\n${formatMatrix(resultMatrix)}`;
                        break;
                        
                    case "determinant":
                        if (matrixARows !== matrixACols) {
                            throw new Error("Matrix must be square to calculate determinant.");
                        }
                        const det = matrixDeterminant(matrixA);
                        resultText = `Determinant of A: ${det.toFixed(4)}`;
                        break;
                        
                    case "inverse":
                        if (matrixARows !== matrixACols) {
                            throw new Error("Matrix must be square to calculate inverse.");
                        }
                        const det_inv = matrixDeterminant(matrixA);
                        if (Math.abs(det_inv) < 1e-10) {
                            throw new Error("Matrix is not invertible (determinant is zero).");
                        }
                        resultMatrix = matrixInverse(matrixA);
                        resultText = `Inverse of A:\n${formatMatrix(resultMatrix)}`;
                        break;
                        
                    case "transpose":
                        resultMatrix = matrixTranspose(matrixA);
                        resultText = `Transpose of A:\n${formatMatrix(resultMatrix)}`;
                        break;
                        
                    case "trace":
                        if (matrixARows !== matrixACols) {
                            throw new Error("Matrix must be square to calculate trace.");
                        }
                        const trace = matrixTrace(matrixA);
                        resultText = `Trace of A: ${trace.toFixed(4)}`;
                        break;
                }
                
                result = resultText;
                resultClass = 'text-blue-600 whitespace-pre font-mono';
                
            } catch (error) {
                result = `Error: ${error.message}`;
                resultClass = 'text-rose-600';
            }
            break;
        default:
            result = "Tool not implemented yet";
            resultClass = 'text-gray-600';
    }
    
    // Update result with styling
    resultDisplay.className = `font-medium ${resultClass}`;
    if (tool === "prime factorization") {
        resultDisplay.innerHTML = result;
    } else {
        resultDisplay.textContent = result;
    }
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
    
    // Group factors and count occurrences
    const factorCounts = {};
    factors.forEach(factor => {
        factorCounts[factor] = (factorCounts[factor] || 0) + 1;
    });
    
    // Format as factor with superscript for exponents
    const formattedFactors = Object.entries(factorCounts).map(([factor, count]) => {
        return count === 1 ? `${factor}` : `${factor}<sup>${count}</sup>`;
    });
    
    return formattedFactors;
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

// New function implementations
function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

function decimalToBinary(decimal) {
    return decimal.toString(2);
}

function isEven(num) {
    return num % 2 === 0;
}

function isOdd(num) {
    return num % 2 !== 0;
}

function romanToDecimal(roman) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let result = 0;
    
    for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i]];
        const next = romanMap[roman[i + 1]];
        
        if (next && current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }
    
    return result;
}

function decimalToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];
    
    let result = '';
    let remaining = num;
    
    for (const numeral of romanNumerals) {
        while (remaining >= numeral.value) {
            result += numeral.symbol;
            remaining -= numeral.value;
        }
    }
    
    return result;
}

function countDigits(num) {
    return num.toString().replace(/[^0-9]/g, '').length;
}

function baseMathOperations(num) {
    // Implement the logic for base math operations
    // This is a placeholder and should be replaced with the actual implementation
    return num * 2; // Placeholder return, actual implementation needed
}

function convertUnits(category, value) {
    // Implement the logic for converting units
    // This is a placeholder and should be replaced with the actual implementation
    return value * 2; // Placeholder return, actual implementation needed
}

function populateUnitOptions() {
    const category = document.getElementById('unitCategory').value;
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    
    // Clear existing options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    // Define units for each category
    const units = {
        length: [
            { value: 'mm', label: 'Millimeter (mm)' },
            { value: 'cm', label: 'Centimeter (cm)' },
            { value: 'm', label: 'Meter (m)' },
            { value: 'km', label: 'Kilometer (km)' },
            { value: 'in', label: 'Inch (in)' },
            { value: 'ft', label: 'Foot (ft)' },
            { value: 'yd', label: 'Yard (yd)' },
            { value: 'mi', label: 'Mile (mi)' }
        ],
        mass: [
            { value: 'mg', label: 'Milligram (mg)' },
            { value: 'g', label: 'Gram (g)' },
            { value: 'kg', label: 'Kilogram (kg)' },
            { value: 't', label: 'Metric Ton (t)' },
            { value: 'oz', label: 'Ounce (oz)' },
            { value: 'lb', label: 'Pound (lb)' },
            { value: 'st', label: 'Stone (st)' }
        ],
        temperature: [
            { value: 'c', label: 'Celsius (°C)' },
            { value: 'f', label: 'Fahrenheit (°F)' },
            { value: 'k', label: 'Kelvin (K)' }
        ],
        area: [
            { value: 'mm2', label: 'Square Millimeter (mm²)' },
            { value: 'cm2', label: 'Square Centimeter (cm²)' },
            { value: 'm2', label: 'Square Meter (m²)' },
            { value: 'ha', label: 'Hectare (ha)' },
            { value: 'km2', label: 'Square Kilometer (km²)' },
            { value: 'in2', label: 'Square Inch (in²)' },
            { value: 'ft2', label: 'Square Foot (ft²)' },
            { value: 'ac', label: 'Acre (ac)' },
            { value: 'mi2', label: 'Square Mile (mi²)' }
        ],
        volume: [
            { value: 'ml', label: 'Milliliter (ml)' },
            { value: 'l', label: 'Liter (l)' },
            { value: 'm3', label: 'Cubic Meter (m³)' },
            { value: 'gal', label: 'Gallon (gal)' },
            { value: 'qt', label: 'Quart (qt)' },
            { value: 'pt', label: 'Pint (pt)' },
            { value: 'floz', label: 'Fluid Ounce (fl oz)' },
            { value: 'cup', label: 'Cup (cup)' },
            { value: 'tbsp', label: 'Tablespoon (tbsp)' },
            { value: 'tsp', label: 'Teaspoon (tsp)' }
        ],
        time: [
            { value: 'ms', label: 'Millisecond (ms)' },
            { value: 's', label: 'Second (s)' },
            { value: 'min', label: 'Minute (min)' },
            { value: 'h', label: 'Hour (h)' },
            { value: 'd', label: 'Day (d)' },
            { value: 'wk', label: 'Week (wk)' },
            { value: 'mo', label: 'Month (mo)' },
            { value: 'yr', label: 'Year (yr)' }
        ],
        digital: [
            { value: 'b', label: 'Bit (b)' },
            { value: 'B', label: 'Byte (B)' },
            { value: 'KB', label: 'Kilobyte (KB)' },
            { value: 'MB', label: 'Megabyte (MB)' },
            { value: 'GB', label: 'Gigabyte (GB)' },
            { value: 'TB', label: 'Terabyte (TB)' },
            { value: 'PB', label: 'Petabyte (PB)' }
        ],
        speed: [
            { value: 'mps', label: 'Meters per Second (m/s)' },
            { value: 'kph', label: 'Kilometers per Hour (km/h)' },
            { value: 'fps', label: 'Feet per Second (ft/s)' },
            { value: 'mph', label: 'Miles per Hour (mph)' },
            { value: 'kn', label: 'Knot (kn)' }
        ]
    };
    
    // Populate options
    const selectedUnits = units[category] || [];
    selectedUnits.forEach(unit => {
        const fromOption = document.createElement('option');
        fromOption.value = unit.value;
        fromOption.textContent = unit.label;
        fromUnitSelect.appendChild(fromOption);
        
        const toOption = document.createElement('option');
        toOption.value = unit.value;
        toOption.textContent = unit.label;
        toUnitSelect.appendChild(toOption);
    });
    
    // Select different 'to' unit if available
    if (toUnitSelect.options.length > 1) {
        toUnitSelect.selectedIndex = 1;
    }
    
    // Trigger calculation
    calculateResult('unit converter');
}

function convertUnit(value, fromUnit, toUnit, category) {
    // Base units for each category
    // For length: meters, mass: grams, temperature: celsius, etc.
    
    if (fromUnit === toUnit) return value;
    
    // Handle temperature specially due to non-linear conversions
    if (category === 'temperature') {
        // Convert to Celsius first
        let celsius;
        switch (fromUnit) {
            case 'c': celsius = value; break;
            case 'f': celsius = (value - 32) * 5/9; break;
            case 'k': celsius = value - 273.15; break;
            default: throw new Error('Unknown temperature unit');
        }
        
        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'c': return celsius;
            case 'f': return celsius * 9/5 + 32;
            case 'k': return celsius + 273.15;
            default: throw new Error('Unknown temperature unit');
        }
    }
    
    // Handle other linear conversions using conversion factors
    const conversionFactors = {
        // Length (to meters)
        length: {
            mm: 0.001,
            cm: 0.01,
            m: 1,
            km: 1000,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.344
        },
        // Mass (to grams)
        mass: {
            mg: 0.001,
            g: 1,
            kg: 1000,
            t: 1000000,
            oz: 28.349523125,
            lb: 453.59237,
            st: 6350.29318
        },
        // Area (to square meters)
        area: {
            mm2: 0.000001,
            cm2: 0.0001,
            m2: 1,
            ha: 10000,
            km2: 1000000,
            in2: 0.00064516,
            ft2: 0.09290304,
            ac: 4046.8564224,
            mi2: 2589988.110336
        },
        // Volume (to liters)
        volume: {
            ml: 0.001,
            l: 1,
            m3: 1000,
            gal: 3.785411784,
            qt: 0.946352946,
            pt: 0.473176473,
            floz: 0.0295735296,
            cup: 0.2365882365,
            tbsp: 0.01478676478125,
            tsp: 0.00492892159375
        },
        // Time (to seconds)
        time: {
            ms: 0.001,
            s: 1,
            min: 60,
            h: 3600,
            d: 86400,
            wk: 604800,
            mo: 2592000, // Approximated as 30 days
            yr: 31536000 // Non-leap year (365 days)
        },
        // Digital (to bytes)
        digital: {
            b: 0.125,
            B: 1,
            KB: 1024,
            MB: 1048576,
            GB: 1073741824,
            TB: 1099511627776,
            PB: 1125899906842624
        },
        // Speed (to meters per second)
        speed: {
            mps: 1,
            kph: 0.277777778,
            fps: 0.3048,
            mph: 0.44704,
            kn: 0.514444444
        }
    };
    
    // Get conversion factors for the specified category
    const factors = conversionFactors[category];
    if (!factors) throw new Error('Unknown unit category');
    
    const fromFactor = factors[fromUnit];
    const toFactor = factors[toUnit];
    
    if (fromFactor === undefined || toFactor === undefined) 
        throw new Error('Unknown unit');
    
    // Convert to base unit, then to target unit
    return (value * fromFactor) / toFactor;
}

function formatUnitDisplay(value, unit, category) {
    // Format the value with appropriate unit symbol
    let formatted = value.toLocaleString(undefined, {
        maximumFractionDigits: 10,
        minimumFractionDigits: 0
    });
    
    const unitSymbols = {
        // Length
        mm: 'mm',
        cm: 'cm',
        m: 'm',
        km: 'km',
        in: 'in',
        ft: 'ft',
        yd: 'yd',
        mi: 'mi',
        // Mass
        mg: 'mg',
        g: 'g',
        kg: 'kg',
        t: 't',
        oz: 'oz',
        lb: 'lb',
        st: 'st',
        // Temperature
        c: '°C',
        f: '°F',
        k: 'K',
        // Area
        mm2: 'mm²',
        cm2: 'cm²',
        m2: 'm²',
        ha: 'ha',
        km2: 'km²',
        in2: 'in²',
        ft2: 'ft²',
        ac: 'ac',
        mi2: 'mi²',
        // Volume
        ml: 'ml',
        l: 'l',
        m3: 'm³',
        gal: 'gal',
        qt: 'qt',
        pt: 'pt',
        floz: 'fl oz',
        cup: 'cup',
        tbsp: 'tbsp',
        tsp: 'tsp',
        // Time
        ms: 'ms',
        s: 's',
        min: 'min',
        h: 'h',
        d: 'd',
        wk: 'wk',
        mo: 'mo',
        yr: 'yr',
        // Digital Storage
        b: 'bit',
        B: 'B',
        KB: 'KB',
        MB: 'MB',
        GB: 'GB',
        TB: 'TB',
        PB: 'PB',
        // Speed
        mps: 'm/s',
        kph: 'km/h',
        fps: 'ft/s',
        mph: 'mph',
        kn: 'kn'
    };
    
    const symbol = unitSymbols[unit] || unit;
    return `${formatted} ${symbol}`;
}

// Function to update encryption options based on selected encryption type
function updateEncryptionOptions(encryptionType) {
    const caesarOptions = document.getElementById('caesarOptions');
    const xorOptions = document.getElementById('xorOptions');
    const decryptRadio = document.querySelector('input[name="encryptMode"][value="decrypt"]');
    
    // Reset options
    caesarOptions.style.display = 'none';
    xorOptions.style.display = 'none';
    
    // Show relevant options
    switch(encryptionType) {
        case 'caesar':
            caesarOptions.style.display = 'block';
            decryptRadio.disabled = false;
            break;
        case 'base64':
        case 'rot13':
            decryptRadio.disabled = false;
            break;
        case 'xor':
            xorOptions.style.display = 'block';
            decryptRadio.disabled = false;
            break;
    }
}

// Caesar Cipher function
function caesarCipher(text, shift) {
    // Ensure shift is within range 0-25
    shift = ((shift % 26) + 26) % 26;
    
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        
        // Uppercase letters
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        // Lowercase letters
        else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        // Non-alphabetic characters
        return char;
    }).join('');
}

// ROT13 function
function rot13(text) {
    return caesarCipher(text, 13);
}

// XOR Cipher function
function xorCipher(text, key) {
    if (!key) return text; // If no key, return the original text
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
        // XOR the character code with the key character code (repeating the key if needed)
        const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    
    return result;
}

// Function to find roots of a polynomial
function findPolynomialRoots(coeffs) {
    // Remove leading zeros
    while (coeffs.length > 1 && coeffs[0] === 0) {
        coeffs.shift();
    }
    
    const degree = coeffs.length - 1;
    
    // Handle special cases
    if (degree === 0) {
        return []; // Constant polynomial, no roots
    }
    
    if (degree === 1) {
        // Linear equation: ax + b = 0
        return [-coeffs[1] / coeffs[0]];
    }
    
    if (degree === 2) {
        // Quadratic equation: ax² + bx + c = 0
        const a = coeffs[0];
        const b = coeffs[1];
        const c = coeffs[2];
        
        const discriminant = b*b - 4*a*c;
        
        if (discriminant > 0) {
            // Two real roots
            const sqrtD = Math.sqrt(discriminant);
            return [(-b + sqrtD) / (2*a), (-b - sqrtD) / (2*a)];
        } else if (discriminant === 0) {
            // One real root (double root)
            return [-b / (2*a)];
        } else {
            // Complex roots
            const realPart = -b / (2*a);
            const imagPart = Math.sqrt(-discriminant) / (2*a);
            return [
                {re: realPart, im: imagPart},
                {re: realPart, im: -imagPart}
            ];
        }
    }
    
    // For higher degree polynomials, use Durand-Kerner method
    return durandKernerMethod(coeffs);
}

// Durand-Kerner method for finding complex roots of polynomials
function durandKernerMethod(coeffs) {
    const degree = coeffs.length - 1;
    
    // Normalize the polynomial so the leading coefficient is 1
    const normalizedCoeffs = coeffs.map(c => c / coeffs[0]);
    
    // Function to evaluate the polynomial at a point z
    function evaluatePolynomial(z, coeffs) {
        let result = {re: 0, im: 0};
        let power = {re: 1, im: 0}; // z^0 = 1
        
        for (let i = coeffs.length - 1; i >= 0; i--) {
            // Add c_i * z^(n-i) to result
            result.re += coeffs[i] * power.re;
            result.im += coeffs[i] * power.im;
            
            // Compute next power of z (z^(n-i+1))
            if (i > 0) {
                const nextRe = power.re * z.re - power.im * z.im;
                const nextIm = power.re * z.im + power.im * z.re;
                power.re = nextRe;
                power.im = nextIm;
            }
        }
        
        return result;
    }
    
    // Function to compute complex division
    function complexDivide(a, b) {
        const denominator = b.re * b.re + b.im * b.im;
        return {
            re: (a.re * b.re + a.im * b.im) / denominator,
            im: (a.im * b.re - a.re * b.im) / denominator
        };
    }
    
    // Function to compute complex subtraction
    function complexSubtract(a, b) {
        return {re: a.re - b.re, im: a.im - b.im};
    }
    
    // Function to compute complex multiplication
    function complexMultiply(a, b) {
        return {
            re: a.re * b.re - a.im * b.im,
            im: a.re * b.im + a.im * b.re
        };
    }
    
    // Initial approximations
    const roots = [];
    for (let i = 0; i < degree; i++) {
        const angle = 2 * Math.PI * i / degree;
        roots.push({
            re: 0.4 * Math.cos(angle),
            im: 0.4 * Math.sin(angle)
        });
    }
    
    // Maximum number of iterations and convergence tolerance
    const maxIterations = 100;
    const tolerance = 1e-10;
    
    // Iterative improvement of approximations
    for (let iter = 0; iter < maxIterations; iter++) {
        let maxChange = 0;
        
        for (let i = 0; i < degree; i++) {
            // Compute P(roots[i])
            const p = evaluatePolynomial(roots[i], normalizedCoeffs);
            
            // Compute denominator: product of (roots[i] - roots[j]) for j != i
            let denominator = {re: 1, im: 0};
            for (let j = 0; j < degree; j++) {
                if (j !== i) {
                    denominator = complexMultiply(denominator, 
                        complexSubtract(roots[i], roots[j]));
                }
            }
            
            // Compute correction term: P(roots[i]) / denominator
            const correction = complexDivide(p, denominator);
            
            // Update roots[i]
            const newRoot = complexSubtract(roots[i], correction);
            
            // Track the maximum change
            const change = Math.sqrt(
                Math.pow(newRoot.re - roots[i].re, 2) + 
                Math.pow(newRoot.im - roots[i].im, 2)
            );
            maxChange = Math.max(maxChange, change);
            
            // Update the root
            roots[i] = newRoot;
        }
        
        // Check for convergence
        if (maxChange < tolerance) {
            break;
        }
    }
    
    // Convert roots with very small imaginary parts to real roots
    const finalRoots = roots.map(root => {
        if (Math.abs(root.im) < 1e-10) {
            return root.re;
        }
        return root;
    });
    
    return finalRoots;
}

// Parse matrix from string input
function parseMatrix(input, rows, cols) {
    const lines = input.trim().split(/\n+/);
    const matrix = [];
    
    for (let i = 0; i < rows; i++) {
        const rowValues = (i < lines.length ? lines[i] : "").split(/[\s,]+/).filter(v => v !== "");
        const row = [];
        
        for (let j = 0; j < cols; j++) {
            // Use 0 if value is missing
            row.push(j < rowValues.length ? parseFloat(rowValues[j]) : 0);
        }
        
        matrix.push(row);
    }
    
    return matrix;
}

// Update the formatMatrix function to improve matrix display
function formatMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Find the maximum string length for alignment
    let maxLength = 0;
    const formattedValues = [];
    
    for (let i = 0; i < rows; i++) {
        formattedValues[i] = [];
        for (let j = 0; j < cols; j++) {
            // Round to 4 decimal places and remove trailing zeros
            const val = parseFloat(matrix[i][j].toFixed(4));
            const formatted = val.toString();
            formattedValues[i][j] = formatted;
            maxLength = Math.max(maxLength, formatted.length);
        }
    }
    
    // Build the matrix with proper alignment
    let result = "";
    
    for (let i = 0; i < rows; i++) {
        result += "│ ";
        for (let j = 0; j < cols; j++) {
            // Pad the value for alignment
            const padded = formattedValues[i][j].padStart(maxLength);
            result += padded + " ";
        }
        result += "│\n";
    }
    
    return result;
}

// Matrix addition
function matrixAddition(A, B) {
    const result = [];
    
    for (let i = 0; i < A.length; i++) {
        const row = [];
        for (let j = 0; j < A[0].length; j++) {
            row.push(A[i][j] + B[i][j]);
        }
        result.push(row);
    }
    
    return result;
}

// Matrix subtraction
function matrixSubtraction(A, B) {
    const result = [];
    
    for (let i = 0; i < A.length; i++) {
        const row = [];
        for (let j = 0; j < A[0].length; j++) {
            row.push(A[i][j] - B[i][j]);
        }
        result.push(row);
    }
    
    return result;
}

// Matrix multiplication
function matrixMultiplication(A, B) {
    const result = [];
    
    for (let i = 0; i < A.length; i++) {
        const row = [];
        for (let j = 0; j < B[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < A[0].length; k++) {
                sum += A[i][k] * B[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }
    
    return result;
}

// Matrix determinant using recursive method
function matrixDeterminant(A) {
    const n = A.length;
    
    // Base case for 1x1 matrix
    if (n === 1) return A[0][0];
    
    // Base case for 2x2 matrix
    if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
    
    let determinant = 0;
    
    // Expand by first row
    for (let j = 0; j < n; j++) {
        // Create submatrix by removing first row and column j
        const submatrix = [];
        for (let i = 1; i < n; i++) {
            const row = [];
            for (let k = 0; k < n; k++) {
                if (k !== j) row.push(A[i][k]);
            }
            submatrix.push(row);
        }
        
        // Add to determinant with alternating signs
        const sign = j % 2 === 0 ? 1 : -1;
        determinant += sign * A[0][j] * matrixDeterminant(submatrix);
    }
    
    return determinant;
}

// Matrix inverse using adjugate method
function matrixInverse(A) {
    const n = A.length;
    
    // For 1x1 matrix, inverse is 1/A[0][0]
    if (n === 1) return [[1 / A[0][0]]];
    
    // Calculate determinant
    const det = matrixDeterminant(A);
    
    // Calculate cofactor matrix
    const cofactors = [];
    for (let i = 0; i < n; i++) {
        const cofactorRow = [];
        for (let j = 0; j < n; j++) {
            // Create submatrix by removing row i and column j
            const submatrix = [];
            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    const row = [];
                    for (let l = 0; l < n; l++) {
                        if (l !== j) row.push(A[k][l]);
                    }
                    submatrix.push(row);
                }
            }
            
            // Calculate minor and multiply by (-1)^(i+j)
            const sign = (i + j) % 2 === 0 ? 1 : -1;
            cofactorRow.push(sign * matrixDeterminant(submatrix));
        }
        cofactors.push(cofactorRow);
    }
    
    // Transpose cofactor matrix to get adjugate
    const adjugate = matrixTranspose(cofactors);
    
    // Divide adjugate by determinant
    const inverse = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(adjugate[i][j] / det);
        }
        inverse.push(row);
    }
    
    return inverse;
}

// Matrix transpose
function matrixTranspose(A) {
    const rows = A.length;
    const cols = A[0].length;
    
    const result = [];
    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(A[i][j]);
        }
        result.push(newRow);
    }
    
    return result;
}

// Matrix trace (sum of diagonal elements)
function matrixTrace(A) {
    let trace = 0;
    
    for (let i = 0; i < A.length; i++) {
        trace += A[i][i];
    }
    
    return trace;
}
