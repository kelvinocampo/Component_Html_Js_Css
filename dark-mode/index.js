document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('circle');
    const body = document.getElementById('body');
    let darkmode = false;
    circle.addEventListener('click', () => {
        if (!darkmode) {
            circle.style.transform = 'translate(50px)';
            body.style.background = '#001';
            
            darkmode = true;
        } else {
            circle.style.transform = 'translate(0)';
            body.style.backgroundColor='#fff';
            darkmode = false;
        }
    });
});