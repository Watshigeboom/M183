const encryptKeyTxtBox = document.getElementById('encryptkey');
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

encryptBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    cipherTxtBox.value = encrypt(encryptKeyTxtBox.value, plainTxtBox.value);

    decryptBtn.disabled = !isalpha(decryptKeyTxtBox.value);
    analyzeCiphertextBtn.disabled = false;
})

analyzeCiphertextBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    chartCiphertext.innerHTML = createHTMLTable(createHistogramValues(cipherTxtBox.value));
})

decryptBtn.addEventListener('click', e =>{
    e.preventDefault();
    e.stopPropagation();
    plainTxtBox.value = decrypt(decryptKeyTxtBox.value, cipherTxtBox.value);

    encryptBtn.disabled = !isalpha(encryptKeyTxtBox.value);
    analyzePlaintextBtn.disabled = false;
    
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


// Vigenere
const lowerReference = 'abcdefghijklmnopqrstuvwxyz';
const upperReference = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function isalpha(str) {
    return (/^[a-zA-Z]+$/).test(str);
}

function encrypt(w, p) {
    return vigenere(w, p);
}

function decrypt(w, p) {
    return vigenere(w, p, -1);
}

function vigenere(word, phrase, flag = 1) {

    if (typeof word !== 'string' || typeof phrase !== 'string') {
        throw new Error('word and phrase must be strings!');
    }


    if (!isalpha(word)) {
        throw new Error('word must only contain letters!');
    }


    word = word.toLowerCase();

    const len = phrase.length;
    const wlen = word.length;

    let i = 0,
        wi = 0,
        ci,
        pos,
        result = '';

    for (i; i < len; i++) {
        pos = phrase[i];
        if (isalpha(pos)) {
            if (flag > 0) {
                ci = lowerReference.indexOf(pos.toLowerCase()) + lowerReference.indexOf(word[wi]);
            } else {
                ci = lowerReference.indexOf(pos.toLowerCase()) - lowerReference.indexOf(word[wi]);
                ci = ci < 0 ? 26 + ci : ci;
            }
            ci %= 26;

            result = lowerReference.indexOf(pos) === -1 ? result + upperReference[ci] : result + lowerReference[ci];

            wi = wi + 1 === wlen ? 0 : wi + 1;
        } else {
            result += pos;
        }
    }

    return result;
}

// Validation
plainTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    encryptBtn.disabled = isEmpty(plainTxtBox.value) || !isalpha(encryptKeyTxtBox.value);
    analyzePlaintextBtn.disabled = isEmpty(plainTxtBox.value);
})

encryptKeyTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    encryptBtn.disabled = isEmpty(plainTxtBox.value) || !isalpha(encryptKeyTxtBox.value);
})

cipherTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    decryptBtn.disabled = isEmpty(cipherTxtBox.value) || !isalpha(decryptKeyTxtBox.value);
    analyzeCiphertextBtn.disabled = isEmpty(cipherTxtBox.value);
})

decryptKeyTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    decryptBtn.disabled = isEmpty(cipherTxtBox.value) || !isalpha(decryptKeyTxtBox.value);
})

function isEmpty(s){
    return s.trim() == '';
}

