document.addEventListener('DOMContentLoaded', function () {
    const search = document.getElementById('searcher').value;
    const nav = document.getElementById('nav');
    nav.style.transition = 'background-color 0.5s ease-in-out';
    search.addEventListener('focus', function () {
        nav.style.transition = 'background-color 0.5s ease-out';
        nav.style.background = 'violet';
    });
    search.addEventListener('blur', function () {
        nav.style.transition = 'background-color 0.5s ease-out';
        nav.style.background = 'blueviolet';
    });
});
jQuery(document).ready(function ($) {
    $('#searcher').keyup(function () {
        var value = reemplazarAcentos($(this).val().toLowerCase());
        $('.container .content').hide().filter(function () {
            return existText($(this).text(), value);
        }).show();
    });
    function reemplazarAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    function existText(text, value) {
        return reemplazarAcentos(text.toLowerCase()).indexOf(value) != -1;
    }
});

