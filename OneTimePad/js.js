const plaintextSpan = document.getElementById('plaintextSpan');
const decryptKeyTxtBox = document.getElementById('decryptkey');

const plainTxtBox = document.getElementById('plaintext');
const cipherTxtBox = document.getElementById('ciphertext');

const analyzePlaintextBtn = document.getElementById('analyze_plaintext');
const analyzeCiphertextBtn = document.getElementById('analyze_ciphertext');
const encryptBtn = document.getElementById('encrypt');
const decryptBtn = document.getElementById('decrypt');

const chartPlaintext = document.getElementById('chart_plaintext');
const chartCiphertext = document.getElementById('chart_ciphertext');


analyzePlaintextBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    chartPlaintext.innerHTML = createHTMLTable(createHistogramValues(plainTxtBox.value));
})

analyzeCiphertextBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    chartCiphertext.innerHTML = createHTMLTable(createHistogramValues(cipherTxtBox.value));
})

encryptBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const {key, ciphertext} = encrypt(plainTxtBox.value);
    cipherTxtBox.value = ciphertext;
    decryptKeyTxtBox.value = key;
    plaintextSpan.innerHTML = plainTxtBox.value;


    plainTxtBox.value = '';
    analyzePlaintextBtn.disabled = encryptBtn.disabled = true;
    analyzeCiphertextBtn.disabled = decryptBtn.disabled = false;

})

decryptBtn.addEventListener('click', e =>{
    e.preventDefault();
    e.stopPropagation();
    plainTxtBox.value = decrypt(decryptKeyTxtBox.value, cipherTxtBox.value); 
    
    cipherTxtBox.value = decryptKeyTxtBox.value = plaintextSpan.innerHTML = '';
    analyzeCiphertextBtn.disabled = decryptBtn.disabled = true;
    analyzePlaintextBtn.disabled = encryptBtn.disabled = false;
});

function createHistogramValues(text) {
    var histogram_prepare = [];

    for (let i = 0, len = text.length; i < len; i++){
        var letter = text[i];

        if (letter.match(/[a-z]/i)){
            histogram_prepare[letter] = (histogram_prepare[letter] || 0) + 1;
        }
    }

    histogram = histogram_prepare.sort((a, b) => {
        a = a[1];
        b = b[1];
        return a < b ? -1 : (a > b ? 1 : 0);
    });

    return histogram;
}

function createHTMLTable(histogram){
    var html = '<table>';

    for (let key in histogram){
        html += '<tr>';
        html += '<td>' + key + ': </td><td>&nbsp;</td>';
        html += '<td>' + histogram[key] + '</td>';
        html += '</tr>';
    }
    html += '</table>'
    return html;
}

// Encryption
const allowedValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.;,!?^+_/%*"$<>=(){}[]';

function encrypt(s) {
    var key, ciphertext;
    key = ciphertext = '';
    for (let x = 0; x < s.length; x++) {
        let c = allowedValues[Math.floor(Math.random() * allowedValues.length)];
        key += c;
        ciphertext += String.fromCharCode(c.charCodeAt(0) ^ s.charCodeAt(x));
    }
    return {key, ciphertext};

}

function decrypt(key, ciphertext) {
    var output = ''; 
    for (let x = 0; x < ciphertext.length; x++) {
        output += String.fromCharCode(key[x].charCodeAt(0) ^ ciphertext[x].charCodeAt(0));
    }
    return output;
}





// Validation
plainTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    encryptBtn.disabled = analyzePlaintextBtn.disabled = isEmpty(plainTxtBox.value);
})

function isEmpty(s){
    return s.trim() == '';
}

