const span1 = document.querySelector('#span1');
const span2 = document.querySelector('#span2');
const span3 = document.querySelector('#span3');
const navbtn = document.querySelector('#navbtn');
const sidebar = document.querySelector('#sidebar');
const blur =document.querySelector('#blur');
let click = false;

navbtn.addEventListener('click', () => {
    if (!click) {
        span1.style.transform = 'translateY(16px) rotate(45deg)';
        span2.style.opacity = '0';
        span3.style.transform = 'translateY(-16px) rotate(-45deg)';
        span1.style.width = '50px';
        span3.style.width = '50px';
        sidebar.style.transform = 'none';
        blur.style.transform = 'none';
    } else {
        span1.style.transform = 'none';
        span2.style.opacity = '1';
        span3.style.transform = 'none';
        span1.style.width = '40px';
        span3.style.width = '40px';
        sidebar.style.transform = 'translateX(-100%)';
        blur.style.transform = 'translateX(100%)';
    }
    click = !click;
});
