const iframe = document.getElementById('iframe');

setInterval(e => {

    if (iframe.style.visibility == 'hidden') {
        iframe.style.visibility = 'visible';
    } else {
        iframe.style.visibility = 'hidden';
    }
    
}, 1000);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target && e.target.id == 'form') {
        alert('oops not what you expected.');
    }
});