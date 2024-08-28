document.addEventListener('DOMContentLoaded', function() {
    const encryptButton = document.getElementById('encrypt-button');
    const decryptButton = document.getElementById('decrypt-button');
    const pasteButton = document.getElementById('paste-button');
    const clearButton = document.getElementById('clear-button');
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    
    const rules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    
    const invalidCharsPattern = /[^a-z\s]/;

    inputText.addEventListener('input', function() {
        const value = inputText.value;
        if (invalidCharsPattern.test(value)) {
            alert('Recuerda que solo se permiten letras minúsculas sin acentos ni caracteres especiales.');
        }
    });

    function encrypt(text) {
        return text.replace(/[aeiou]/g, match => rules[match]);
    }

    function decrypt(text) {
        const reversedRules = Object.fromEntries(Object.entries(rules).map(([key, value]) => [value, key]));
        return text.replace(/enter|imes|ai|ober|ufat/g, match => reversedRules[match]);
    }

    function handleEncryption() {
        const text = inputText.value.trim();
        const encryptedText = encrypt(text);
        showResult(encryptedText);
    }

    function handleDecryption() {
        const text = inputText.value.trim();
        const decryptedText = decrypt(text);
        showResult(decryptedText);
    }

    function showResult(text) {
        outputText.innerHTML = '';
        if (text) {
            const resultParagraph = document.createElement('p');
            resultParagraph.textContent = text;
            outputText.appendChild(resultParagraph);
            const copyButton = document.createElement('button');
            copyButton.id = 'copy-button';
            copyButton.textContent = 'Copiar';
            copyButton.style.display = 'block';
            copyButton.addEventListener('click', copyToClipboard);
            outputText.appendChild(copyButton);
        } else {
            outputText.innerHTML = `
                <img src="img/muñeco.png" alt="No Message">
                <p id="output-text-big">Ningún mensaje fue encontrado</p>
                <p>Ingresa el texto que desees encriptar o desencriptar.</p>
            `;
        }
    }

    function copyToClipboard() {
        const textContent = outputText.querySelector('p').textContent;
        navigator.clipboard.writeText(textContent)
            .then(() => alert('Texto copiado al portapapeles'))
            .catch(err => console.error('Error al copiar: ', err));
    }

    function pasteFromClipboard() {
        navigator.clipboard.readText()
            .then(text => inputText.value = text)
            .catch(err => console.error('Error al pegar: ', err));
    }

    function clearInput() {
        inputText.value = '';
        showResult(''); // Reset output
    }

    encryptButton.addEventListener('click', handleEncryption);
    decryptButton.addEventListener('click', handleDecryption);
    pasteButton.addEventListener('click', pasteFromClipboard);
    clearButton.addEventListener('click', clearInput);
});
