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

    decryptBtn.disabled = !isNumeric(decryptKeyTxtBox.value);
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

    encryptBtn.disabled = !isNumeric(encryptKeyTxtBox.value);
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


function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n) && n >= 0;
}


// Cesar
function encrypt(s, p) {
    return cesar(parseInt(s), p);
}

function decrypt(s, p) {
    return cesar(parseInt(s) * (-1), p);
}



function cesar(amount, str) {


	if (amount < 0) {
        amount += 26;
    }


	var output = '';


	for (var i = 0; i < str.length; i ++) {


		var c = str[i];


		if (c.match(/[a-z]/i)) {


			var code = str.charCodeAt(i);

			if ((code >= 65) && (code <= 90)) {
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            }


			else if ((code >= 97) && (code <= 122)) {
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
		}


		output += c;

	}

	return output;

};

// Validation
plainTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    encryptBtn.disabled = isEmpty(plainTxtBox.value) || !isNumeric(encryptKeyTxtBox.value);
    analyzePlaintextBtn.disabled = isEmpty(plainTxtBox.value);
})

encryptKeyTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    encryptBtn.disabled = isEmpty(plainTxtBox.value) || !isNumeric(encryptKeyTxtBox.value);
})

cipherTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    decryptBtn.disabled = isEmpty(cipherTxtBox.value) || !isNumeric(decryptKeyTxtBox.value);
    analyzeCiphertextBtn.disabled = isEmpty(cipherTxtBox.value);
})

decryptKeyTxtBox.addEventListener('keyup', e => {
    e.stopPropagation();
    decryptBtn.disabled = isEmpty(cipherTxtBox.value) || !isNumeric(decryptKeyTxtBox.value);
})

function isEmpty(s){
    return s.trim() == '';
}